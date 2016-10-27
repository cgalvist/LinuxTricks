angular.module('ng-terminal-example.command.filesystem', ['ng-terminal-example.command.tools'])

.provider('fileSystemConfiguration',function(){
	var provider = function () {
		var me = {};
		me.directorySeparator = "\\";
		me.$get = [function () {
			return me;
		}];
		return me;
	};

	return provider();
})

.service('storage', [function () {
	return window.localStorage;
}])

.service('pathTools', ['fileSystemConfiguration', function (config) {
	var pathTools = function(){
		var me = {};
		me.isAbsolute = function (path) {
			if (!path || path.length < config.directorySeparator.length)
				return false;
			return path.substring(0, config.directorySeparator.length) == config.directorySeparator;
		};

		me.addDirectorySeparator = function (path) {
			if (path.substr(path.length - config.directorySeparator.length, config.directorySeparator.length) !== config.directorySeparator) {
				path += config.directorySeparator;
			}
			return path;
		};

		me.addRootDirectorySeparator = function (path) {
			if (!me.isAbsolute(path))
				return config.directorySeparator + path;
			return path;
		};

		me.combine = function () {
			var result = '';
			for (var i = 0; i < arguments.length; i++) {

				var arg = arguments[i];

				if (i != 0 && me.isAbsolute(arg))
					throw new Error("Cuando se combina una ruta, sólo el primer elemento puede ser una ruta absoluta.")
				else if (i == 0)
					arg = me.addRootDirectorySeparator(arg);
				if(i != arguments.length -1)
					arg = me.addDirectorySeparator(arg);

				result += arg;
			}

			return result;
		};

		me.directoryUp = function (path) {
			if (path == config.directorySeparator)
				return path;
			var parts = path.split(config.directorySeparator);
			var count = 1;
			if (parts[parts.length - 1] == "")
				count = 2;

			for (var i = 0; i < count; i++) {
				parts.pop();
			}

			if (parts[0] == "")
				parts = parts.slice(1);
			if (!parts.length)
				return config.directorySeparator;

			return me.combine.apply(me,parts);
		};

		me.isFileOfPath = function (basePath, path) {
			if (path.substr(0, basePath.length) == basePath) {
				var sp = path.substr(basePath.length);
				if (me.isAbsolute(sp) && sp.indexOf(config.directorySeparator) === sp.lastIndexOf(config.directorySeparator)) {
				    sp = sp.substr(config.directorySeparator.length);
				    return sp != "_dir";
				}
				else {
				    return sp.indexOf(config.directorySeparator) == -1 && sp != "_dir";
				}
			}

			return false
		};

		me.isDirectoryOfPath = function (basePath, path) {
			if (path.substr(0, basePath.length) == basePath) {
				var sp = path.substr(basePath.length);
				if (sp.length> 5) {
				    var sp2 = sp.substr(0, sp.length - 5);
                    			if(sp2 + "\\_dir" === sp){
					    var pos = sp2.indexOf("\\");
                        		    return !!sp && (pos == -1 || pos ==0);
                    			}
				}
			}
			return false
		};

		me.getPathItemName = function (path) {
			var parts = path.split(config.directorySeparator);
			var last = parts[parts.length - 1];
			if (last == "_dir") {
				if (parts.length >= 3)
					return parts[parts.length - 2];
				else
					return config.directorySeparator;
			}
			else if(last == "")
				return config.directorySeparator;
			else
				return last;
		};

		var fileNameValidator = /^[\w_.\-]+$/;
		me.isFileNameValid = function (name) {
			return !!name && name[0] != "_" && !!name.match(fileNameValidator);
		};

		var dirNameValidator = /^[\w_\-]+$/;
		me.isDirNameValid = function (name) {
		    return !!name && name[0] != "_" && !!name.match(dirNameValidator);
		};

		return me;
	};
	return pathTools();
}])

.service('fileSystem', ['fileSystemConfiguration', 'pathTools', 'storage', function (config, pathTools, storage) {
	var fs = function () {
		var me = {};
		var _currentPath = config.directorySeparator;

		if (!storage.getItem(config.directorySeparator + "_dir"))
		    storage.setItem(config.directorySeparator + "_dir", "_dir");

		me.path = function (path) {

			if (path == "..") {
				_currentPath = pathTools.directoryUp(_currentPath);
			}
			else if (path && !pathTools.isDirNameValid(path))
			    throw new Error("El nombre del directorio no es válido");
			else if (path) {

				var dirkey = pathTools.combine(_currentPath, path, "_dir");
				if (!storage.getItem(dirkey))
					throw new Error("El directorio  '" + path + "' no existe.");

				_currentPath = pathTools.combine(_currentPath, path);
			}

			return _currentPath;
		};

		me.list = function () {
			var result = {
				directories: [],
				files:[]
			};

			if (_currentPath != config.directorySeparator)
			    result.directories.push("..");

			for (var key in storage) {
				if (pathTools.isFileOfPath(_currentPath, key)) {
					result.files.push(pathTools.getPathItemName(key));
				}
				else if (pathTools.isDirectoryOfPath(_currentPath, key)) {
					result.directories.push(pathTools.getPathItemName(key));
				}
			}
			result.directories.sort();
			result.files.sort();
			return result;
		};

		me.existsDir = function (path, failIfNotExist) {

		    if (!pathTools.isDirNameValid(path))
		        throw new Error("El nombre del directorio no es válido");

			var dirkey = pathTools.combine(_currentPath, path, "_dir");
			var exists = storage.getItem(dirkey);
			if (!exists && failIfNotExist)
				throw new Error("El directorio no existe.");
			return exists;
		};

		me.createDir = function (path) {

		    if (!pathTools.isDirNameValid(path))
		        throw new Error("El nombre del directorio no es válido");

			if (!pathTools.isDirNameValid(pathTools.getPathItemName(path)))
				throw new Error("Nombre del directorio inválido");
			if (me.existsDir(path))
				throw new Error("El directorio ya existe.");
			else {
				var dirkey = pathTools.combine(_currentPath, path, "_dir");
				storage.setItem(dirkey,"_dir");
			}
		};

		me.removeDir = function (path) {
		    console.log("Remove dir: " + path + " on: " + _currentPath);
		    if (!pathTools.isDirNameValid(path))
		        throw new Error("El nombre del directorio no es válido");

		    if (me.existsDir(path, true)) {
		        var dirkey = pathTools.combine(_currentPath, path, "_dir");
		        path = pathTools.combine(_currentPath, path);
		        console.log("Full path: " + path);
				var keys = [];
				for (var key in storage) {

				    if (key.length >= path.length) {
				        var s = key.substr(0, path.length);
				        if (s === path) {
				            keys.push(key);
				            console.log("Remove: "+key);
				            continue;
				        }
				    }
				    console.log("Skip: " + key);
				}
				storage.removeItem(dirkey)
				for (var i = 0; i < keys.length; i++) {
					storage.removeItem(keys[i]);
				}
			}
		};

		me.writeFile = function (name, content) {
			if (!pathTools.isFileNameValid(name))
				throw new Error("Nombre de archivo inválido");
			if (!content)
				throw new Error("Ningún contenido ha sido aprobado");

			var filekey = pathTools.combine(_currentPath, name);
			storage.setItem(filekey, content);
		};

		me.appendToFile = function (name, content) {
			if (!pathTools.isFileNameValid(name))
				throw new Error("Nombre de archivo inválido");
			if (!content)
				throw new Error("Ningún contenido ha sido aprobado");

			var filekey = pathTools.combine(_currentPath, name);
			var prevcontent = storage.getItem(filekey);
			storage.setItem(filekey, (prevcontent?prevcontent + "\n":"") + content);
		};

		me.deleteFile = function (name) {
			if (!pathTools.isFileNameValid(name))
				throw new Error("Nombre de archivo inválido");
			var filekey = pathTools.combine(_currentPath, name);
			if (!storage.getItem(filekey)) {
				throw new Error("El archivo no existe");
			}
			storage.removeItem(filekey);
		};

		me.readFile = function (name) {
			if (!pathTools.isFileNameValid(name))
				throw new Error("Nombre de archivo inválido");

			var filekey = pathTools.combine(_currentPath, name);
			var content = storage.getItem(filekey);
			if (!content) {
				throw new Error("El archivo no existe");
			}
			return content;
		};

		return me;
	};
	return fs();
}])

.config(['commandBrokerProvider', function (commandBrokerProvider) {

    var pwdCommand = function () {
        var me = {};
        var fs = null;
        me.command= 'pwd';
        me.description= ['Muestra el directorio actual.'];
        me.init = ['fileSystem', function (fileSystem) {
            fs = fileSystem;
        }];
        me.handle = function (session) {
            session.output.push({ output: true, text: [fs.path()], breakLine: true });
        }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(pwdCommand());

    var cdCommand = function () {
        var me = {};
        var fs = null;
        me.command = 'cd';
        me.description = ['Cambia el directorio actual.', "Sintaxis: cd <path>", "Ejemplo: cd myDirectory", "Ejemplo: cd .."];
        me.init = ['fileSystem', function (fileSystem) {
            fs = fileSystem;
        }];
        me.handle = function (session, path) {
            if (!path)
                throw new Error("Un nombre de directorio es requerido");
            session.commands.push({ command: 'change-prompt', prompt: { path: fs.path(path) } });
        }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(cdCommand());

    var mkdirCommand = function () {
        var me = {};
        var fs = null;
        me.command = 'mkdir';
        me.description = ['Crea un directorio.',"Sintaxis: mkdir <directoryName>", "Ejemplo: mkdir miDirectorio"];
        me.init = ['fileSystem', function (fileSystem) {
            fs = fileSystem;
        }];
        me.handle = function (session, path) {
            if (!path)
                throw new Error("Un nombre de directorio es requerido");
            fs.createDir(path);
            session.output.push({ output: true, text: ["Directorio creado."], breakLine: true });
        }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(mkdirCommand());

    var rmdirCommand = function () {
        var me = {};
        var fs = null;
        me.command = 'rmdir';
        me.description = ['Elimina un directorio.', "Sintaxis: rmdir <directoryName>", "Ejemplo: rmdir miDirectorio"];
        me.init = ['fileSystem', function (fileSystem) {
            fs = fileSystem;
        }];
        me.handle = function (session, path) {
            if (!path)
                throw new Error("Un nombre de directorio es requerido");
            fs.removeDir(path);
            session.output.push({ output: true, text: ["Directorio eliminado."], breakLine: true });
        }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(rmdirCommand());

    var lsCommand = function () {
        var me = {};
        var fs = null;
        me.command = 'ls';
        me.description = ['Muestra lista de directorios y archivos'];
        me.init = ['fileSystem', function (fileSystem) {
            fs = fileSystem;
        }];
        me.handle = function (session) {
            var l = fs.list();
            var output = [];

            for (var i = 0; i < l.directories.length; i++) {
                output.push("[DIR]\t\t" + l.directories[i]);
            }
            for (var i = 0; i < l.files.length; i++) {
                output.push("     \t\t" + l.files[i]);
            }
            output.push("");
            output.push("Total: " + (l.directories.length + l.files.length));

            session.output.push({ output: true, text: output, breakLine: true });
        }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(lsCommand());

    var catCommand = function () {
        var me = {};
        var fs = null;
        me.command = 'cat';
        me.description = ['Lee un archivo.', "Sintaxis: cat <fileName>", "Ejemplo: cat archivo.txt"];
        me.init = ['fileSystem', function (fileSystem) {
            fs = fileSystem;
        }];
        me.handle = function (session, path) {
            if (!path)
                throw new Error("Un nombre de archivo es requerido");
            var content = fs.readFile(path);
            var outtext = content ? content.split('\n') : [];
            session.output.push({ output: true, text: outtext, breakLine: true });
         }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(catCommand());

    var rmCommand = function () {
        var me = {};
        var fs = null;
        me.command = 'rm';
        me.description = ['Elimina un archivo.', "Sintaxis: rm <fileName>", "Ejemplo: rm archivo.txt"];
        me.init = ['fileSystem', function (fileSystem) {
            fs = fileSystem;
        }];
        me.handle = function (session, path) {
            if (!path)
                throw new Error("Un nombre de archivo es requerido");
           fs.deleteFile(path)
           session.output.push({ output: true, text: ["Archivo eliminado."], breakLine: true });
        }
        return me;
    };
    commandBrokerProvider.appendCommandHandler(rmCommand());

    var createFileRedirection = function () {
        var me = {};
        var fs = null;
        me.command = '>';
        me.init = ['fileSystem', function (fileSystem) {
            fs = fileSystem;
        }];
        me.handle = function (session, path) {
            if (!path)
                throw new Error("Un nombre de archivo es requerido");

            if (session.input) {
                var content = '';
                for (var i = 0; i < session.input.length; i++) {
                    for (var j = 0; j < session.input[i].text.length; j++) {
                        content += session.input[i].text[j];
                        if (j != session.input[i].text.length -1)
                            content += '\n';
                    }
                }
                fs.writeFile(path, content);
            }
        }
        return me;
    };
    commandBrokerProvider.appendRedirectorHandler(createFileRedirection());

    var appendFileRedirection = function () {
        var me = {};
        var fs = null;
        me.command = '>>';
        me.init = ['fileSystem', function (fileSystem) {
            fs = fileSystem;
        }];
        me.handle = function (session, path) {
            if (!path)
                throw new Error("Un nombre de archivo es requerido");

            if (session.input) {
                var content = '';
                for (var i = 0; i < session.input.length; i++) {
                    for (var j = 0; j < session.input[i].text.length; j++) {
                        content += session.input[i].text[j];
                        if (j != session.input[i].text.length - 1)
                            content += '\n';
                    }
                }
                fs.appendToFile(path, content);
            }
        }
        return me;
    };
    commandBrokerProvider.appendRedirectorHandler(appendFileRedirection());
}])

.run(['fileSystemConfiguration', 'storage', function (fs, storage) {
	if (!storage.getItem(fs.directorySeparator + "_dir"))
		storage.setItem(fs.directorySeparator + "_dir", "_dir");
}])

;
