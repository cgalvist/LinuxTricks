angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope) {})

.controller('InicioCtrl', function($scope) {})

.controller('DiccionariosCtrl', function($scope, Diccionarios) {

  Diccionarios.getAll().then(function(data) {
      $scope.diccionarios = data;
    })
    .catch(function(err) {
      console.log(err);
  });
  //console.log($scope.diccionarios);
})

.controller('DiccionarioCtrl', function($scope, $stateParams, Diccionario) {
  //$scope.item = Diccionario.get($stateParams.diccionarioId);
  Diccionario.get($stateParams.diccionarioId).then(function(data) {
      $scope.diccionario = data;
    })
    .catch(function(err) {
      console.log(err);
  });
})

.controller('ComandoCtrl', function($scope, $stateParams, Comando) {
  $scope.item = Comando.get($stateParams.comandoId);
  Comando.get($stateParams.comandoId).then(function(data) {
      $scope.comando = data;
    })
    .catch(function(err) {
      console.log(err);
  });
})

.controller('ProgramasCtrl', function($scope, Programas) {
    Programas.getAll().then(function(data) {
        $scope.programas = data;
      })
      .catch(function(err) {
        console.log(err);
    });
})

.controller('ProgramaCtrl', function($scope, $stateParams, Programa) {
  //$scope.item = Programa.get($stateParams.programaId);
  Programa.get($stateParams.programaId).then(function(data) {
      $scope.programa = data;
    })
    .catch(function(err) {
      console.log(err);
  });
})

.controller('AtajoCtrl', function($scope, $stateParams, Atajo) {
  Atajo.get($stateParams.atajoId).then(function(data) {
      $scope.atajo = data;
    })
    .catch(function(err) {
      console.log(err);
  });
})

.controller('SimuladorCtrl', function($scope) {

    $scope.config = {
      emulador:{
          colorFondo: "#000000",
          colorTexto: "#ffffff",
          tamanoTexto: 12
      }
    };

    //leer configuraciones del usuario
    $scope.$watch(function () {
        return window.localStorage.getItem("colorFondo");
    }, function (value) {
        $scope.config.emulador.colorFondo = value;
    });

    $scope.$watch(function () {
        return window.localStorage.getItem("colorTexto");
    }, function (value) {
        $scope.config.emulador.colorTexto = value;
    });

    $scope.$watch(function () {
        return window.localStorage.getItem("tamanoTexto");
    }, function (value) {
        $scope.config.emulador.tamanoTexto = value;
    });
})

.controller('ConfigCtrl', function($scope, ionicToast) {
  $scope.config = {
    emulador:{
        colorFondo: "#000000",
        colorTexto: "#ffffff",
        tamanoTexto: 12,
    }
  };

  //leer configuraciones del usuario
  $scope.$watch(function () {
      return window.localStorage.getItem("colorFondo");
  }, function (value) {
      $scope.config.emulador.colorFondo = value;
  });

  $scope.$watch(function () {
      return window.localStorage.getItem("colorTexto");
  }, function (value) {
      $scope.config.emulador.colorTexto = value;
  });

  $scope.$watch(function () {
      return window.localStorage.getItem("tamanoTexto");
  }, function (value) {
      $scope.config.emulador.tamanoTexto = parseInt(value);
  });

  $scope.guardar = function(){
    window.localStorage.setItem("colorFondo", $scope.config.emulador.colorFondo);
    window.localStorage.setItem("colorTexto", $scope.config.emulador.colorTexto);
    window.localStorage.setItem("tamanoTexto", $scope.config.emulador.tamanoTexto);
    //console.log($scope.config.emulador)
    ionicToast.show('Configuración actualizada', 'top', false, 2500);
  }
});
