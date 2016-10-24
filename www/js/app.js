// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ng-terminal-example'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.diccionarios', {
      url: '/diccionarios',
      views: {
        'menuContent': {
          templateUrl: 'templates/diccionarios.html',
          controller: 'DiccionariosCtrl'
        }
      }
    })

    .state('app.diccionario', {
      url: '/diccionarios/:diccionarioId',
      views: {
        'menuContent': {
          templateUrl: 'templates/diccionario.html',
          controller: 'DiccionarioCtrl'
        }
      }
    })

    .state('app.comando', {
      url: '/diccionarios/:diccionarioId/comando/:comandoId',
      views: {
        'menuContent': {
          templateUrl: 'templates/comando.html',
          controller: 'ComandoCtrl'
        }
      }
    })

    .state('app.atajos', {
      url: '/atajos',
      views: {
        'menuContent': {
          templateUrl: 'templates/atajos.html',
          controller: 'AtajosCtrl'
        }
      }
    })

    .state('app.programa', {
      url: '/atajos/:itemId',
      views: {
        'menuContent': {
          templateUrl: 'templates/programa.html',
          controller: 'ItemDetailCtrl2'
        }
      }
    })

    .state('app.simulador', {
      url: '/simulador',
      views: {
        'menuContent': {
          templateUrl: 'templates/simulador.html',
          controller: 'SimuladorCtrl'
        }
      }
    })

  .state('app.config', {
    url: '/config',
    views: {
      'menuContent': {
        templateUrl: 'templates/config.html',
        controller: 'ConfigCtrl'
      }
    }
  })

.state('app.about', {
  url: '/about',
  views: {
    'menuContent': {
      templateUrl: 'templates/about.html'
    }
  }
});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
