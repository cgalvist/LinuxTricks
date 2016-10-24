angular.module('starter.controllers', [])

.controller('MenuCtrl', function($scope) {})

.controller('HomeCtrl', function($scope) {})

.controller('DiccionariosCtrl', function($scope, Diccionarios) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Diccionarios.getAll().then(function(data) {
      $scope.diccionarios = data;
    })
    .catch(function(err) {
      console.log("error carga");
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
        console.log("error carga");
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

.controller('SimuladorCtrl', function($scope) {})

.controller('ConfigCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
