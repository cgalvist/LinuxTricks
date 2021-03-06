﻿angular.module('ng-terminal-example', ['vtortola.ng-terminal', 'ng-terminal-example.command.tools', 'ng-terminal-example.command.implementations', 'ng-terminal-example.command.filesystem'])
.controller('console',['$scope','commandBroker','$rootScope', function ($scope, commandBroker, $rootScope) {

    $rootScope.theme = 'vintage';

    setTimeout(function () {
        $scope.$broadcast('terminal-output', {
            output: true,
            text: ['Emulador de consola',
                   '',
                   "Escriba 'help' para ver la lista de comandos disponibles"],
            breakLine: true
        });
        $scope.$apply();
    }, 100);

    $scope.session = {
        commands: [],
        output: [],
        $scope:$scope
    };

    $scope.$watchCollection(function () { return $scope.session.commands; }, function (n) {
        for (var i = 0; i < n.length; i++) {
            $scope.$broadcast('terminal-command', n[i]);
        }
        $scope.session.commands.splice(0, $scope.session.commands.length);
        $scope.$$phase || $scope.$apply();
    });

    $scope.$watchCollection(function () { return $scope.session.output; }, function (n) {
        for (var i = 0; i < n.length; i++) {
            $scope.$broadcast('terminal-output', n[i]);
        }
        $scope.session.output.splice(0, $scope.session.output.length);
        $scope.$$phase || $scope.$apply();
    });

    $scope.$on('terminal-input', function (e, consoleInput) {
        var cmd = consoleInput[0];

        try {
            if ($scope.session.context) {
                $scope.session.context.execute($scope.session, cmd.command);
            }
            else {
                commandBroker.execute($scope.session, cmd.command);
            }
        } catch (err) {
            $scope.session.output.push({ output: true, breakLine: true, text: [err.message] });
        }
    });
}])
.config(['terminalConfigurationProvider', function (terminalConfigurationProvider) {

    terminalConfigurationProvider.config('vintage').outputDelay = 10;
    terminalConfigurationProvider.config('vintage').allowTypingWriteDisplaying = false;
    //terminalConfigurationProvider.config('vintage').typeSoundUrl ='type.wav';
    //terminalConfigurationProvider.config('vintage').startSoundUrl ='start.wav';
}])

;
