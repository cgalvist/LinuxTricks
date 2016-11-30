//var ipServer = '../data';
var ipServer = 'http://127.0.0.1:8000';
//var ipServer = 'http://52.204.1.104:8000';

/*
if(ionic.Platform.isAndroid()){
    ipServer = '/android_asset/www/data';
}
*/

angular.module('starter.services', [])

.factory('Diccionarios', function($http, $q) {

  function getAll() {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: ipServer + '/diccionarios/',
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    getAll: getAll,
    get: function(itemId) {
      var diccionarios = getAll();
      for (var i = 0; i < diccionarios.length; i++) {
        if (diccionarios[i].id === parseInt(itemId)) {
          return diccionarios[i];
        }
      }
      return null;
    }
  };
})

.factory('Diccionario', function($http, $q) {

  function get(id) {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: ipServer + '/diccionarios/',
      params: {
        id: id,
      }
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    get: function(idDiccionario) {
      return get(idDiccionario);
    }
  };
})

.factory('Comando', function($http, $q) {

  function get(id) {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: ipServer + '/diccionarios/comando',
      params: {
        id: id,
      }
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    get: function(idComando) {
      return get(idComando);
    }
  };
})

.factory('Programas', function($http, $q) {

  function getAll() {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: ipServer + '/programas/',
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    getAll: getAll,
    get: function(itemId) {
      var programas = getAll();
      for (var i = 0; i < programas.length; i++) {
        if (programas[i].id === parseInt(itemId)) {
          return programas[i];
        }
      }
      return null;
    }
  };
})

.factory('Programa', function($http, $q) {

  function get(id) {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: ipServer + '/programas/',
      params: {
        id: id,
      }
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    get: function(programaId) {
      return get(programaId);
    }
  };
})

.factory('Atajo', function($http, $q) {

  function get(id) {
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: ipServer + '/programas/atajo',
      params: {
        id: id,
      }
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    get: function(idAtajo) {
      return get(idAtajo);
    }
  };
})

;
