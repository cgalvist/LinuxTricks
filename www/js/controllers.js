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

  $scope.diccionarios = Diccionarios.diccionarios();
  $scope.remove = function(item) {
    Diccionarios.remove(item);
  };
})

.controller('ItemDetailCtrl', function($scope, $stateParams, Diccionarios) {
  $scope.item = Diccionarios.get($stateParams.itemId);
})

.controller('AtajosCtrl', function($scope, Programas){
    $scope.programas = Programas.programas();
})

.controller('ItemDetailCtrl2', function($scope, $stateParams, Programas) {
  $scope.item = Programas.get($stateParams.itemId);
})

.controller('SimuladorCtrl', function($scope) {
})

.controller('ConfigCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
