angular.module('ng-terminal-example.command.implementations', ['ng-terminal-example.command.tools'])

.config(['commandBrokerProvider', function (commandBrokerProvider) {

    commandBrokerProvider.appendCommandHandler({
        command: 'version',
        description: ['Muestra la versión de este software.'],
        handle: function (session) {
            session.output.push({ output: true, text: ['Version 1 Beta'], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'clear',
        description: ['Limpia la pantalla.'],
        handle: function (session) {
            session.commands.push({ command: 'clear' });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'echo',
        description: ['Hace eco de la entrada.'],
        handle: function (session) {
            var a = Array.prototype.slice.call(arguments, 1);
            session.output.push({ output: true, text: [a.join(' ')], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'eval',
        description: ['Evalua entrada (como javascript)','Ejemplo: eval alert(1)'],
        handle: function (session, param) {
            var a = Array.prototype.slice.call(arguments, 1);
            var param = eval(a.join(' '));
            param = param ? param.toString() : '';
            session.output.push({ output: true, text: [param], breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'break',
        description: ['Prueba como los comandos son divididos en segmentos.',"Ejemplo: break 'aaa aaa' aaa aaa"],
        handle: function (session) {
            var a = Array.prototype.slice.call(arguments, 1);
            session.output.push({ output: true, text: a, breakLine: true });
        }
    });

    commandBrokerProvider.appendCommandHandler({
        command: 'websocket',
        description: ['Inicia una sesión websocket.',
                      'Sintaxis: websocket <url> [protocol]',
                      'Ejemplo: websocket wss://echo.websocket.org'],
        handle: function (session, url, protocol) {
            if (!url) {
                throw new Error("El parámetro 'url' es requerido, escriba 'help websocket' para mas información.")
            }

            session.output.push({
                output: true,
                text: ["Abriendo conexión a " + url + (protocol ? " con el protocolo " + protocol : "") + " ...",
                       "Escriba 'exit' para salir."],
                breakLine: true
            });
            session.commands.push({ command: 'change-prompt', prompt: { path: 'websocket[' + url+']'} });
            session.contextName = "websocket";
            session.context = function () {
                var me = {};
                var ws = protocol ? new WebSocket(url, protocol) : new WebSocket(url);
                ws.onopen = function () {
                    session.output.push({ output: true, text: ["Conexión establecida."], breakLine: true });
                    session.$scope.$apply();
                };

                ws.onerror = function () {
                    session.output.push({ output: true, text: ["Error en la conexión."], breakLine: true });
                    session.$scope.$apply();
                    me.execute(session, "exit");
                };

                ws.onmessage = function (msg) {
                    session.output.push({ output: true, text: [msg.data], breakLine: true });
                    session.$scope.$apply();
                };

                me.execute = function (s, c) {
                    if (c == 'exit') {
                        ws.close();
                        s.contextName = "";
                        delete s.context;
                        s.commands.push({ command: 'reset-prompt', prompt: {path:true} });
                        s.output.push({ output: true, text: ["Websocket finalizado."], breakLine: true });
                        return;
                    }
                    ws.send(c);
                };
                return me;
            }();
        }
    });

    var suCommandHandler = function () {
        var me = {};
        me.command= 'su';
        me.description = ['Cambia la identidad del usuario.', "Sintaxis: su <userName>", "Ejemplo: su invitado"];
        me.handle= function (session, login) {
            if (!login) {
                session.output.push({ output: true, text: ["El parámetro <userName> es requerido.", "Escriba 'help su' para mas detalles."], breakLine: true });
                return;
            }

            session.login = login;
            session.commands.push({ command: 'change-prompt', prompt: { user: login }});
            session.output.push({ output: true, text: ["Identidad cambiada."], breakLine: true });
        }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(suCommandHandler());

    // this must be the last
    var helpCommandHandler = function () {
        var me = {};

        me.command = 'help';
        me.description = ['Muestra instrucciones acerca de como utilizar este terminal'];
        me.handle = function (session, cmd) {
            var list = commandBrokerProvider.describe();
            var outText = [];
            if (cmd) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].command == cmd) {
                        var l = list[i];
                        outText.push("Ayuda para el comando: " + cmd);
                        for (var j = 0; j < l.description.length; j++) {
                            outText.push(l.description[j]);
                        }
                        break;
                    }
                }
                if(!outText.length)
                    outText.push("No existe ayuda del comando: " + cmd);
            }
            else {
                outText.push("Comandos disponibles:");
                for (var i = 0; i < list.length; i++) {
                    var str = "  " + list[i].command + "\t\t";
                    for (var j = 0; j < 3 && i + 1 < list.length; j++) {
                        var cmd = list[++i].command;
                        str += cmd + (cmd.length > 6 ? "\t" : "\t\t");
                    }
                    outText.push(str);
                }
                outText.push("");
                outText.push("Escriba 'help <command>' para obtener ayuda de un comando en particular.");
            }
            session.output.push({ output: true, text: outText, breakLine: true });
        };
        return me;
    };
    commandBrokerProvider.appendCommandHandler(helpCommandHandler());
}])

;
