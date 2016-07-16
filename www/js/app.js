// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myDataRef = new Firebase('https://fiery-inferno-1807.firebaseio.com/');
angular.module('starter', ['ionic', 'firebase','starter.controllers', 'starter.services', 'ngCordova', 'ionic-toast'])

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

  .state('root', {
                url : '/root',
                templateUrl : 'templates/root.html',
                controller : 'RootPageController'
    })

  

  .state('Menu', {
     url : '/Menu',
    templateUrl : 'templates/MenuAbstracto.html',
    <!--controller : 'RootPageController',
    abstract : true
    })


  .state('Menu.home', {
      url: '/home',
      views: {
          'contenido': {
              templateUrl: 'templates/MenuHome.html'
          }
      }
  })

  .state('Menu.toast', {
        url: '/toast',
        views: {
         'contenido': {
          templateUrl: 'templates/Menu-toast.html',
          controller: 'ControladorToast'
            }
          }
      })

  
  .state('Menu.geolocation', {
                url: '/geolocation',
                views: {
                  'contenido': {
                   templateUrl: 'templates/Menu-geolocation.html',
                   controller: 'ControladorGeolocation'
                }
          }
      })

  .state('Menu.capture', {
                url: '/capture',
                views: {
                  'contenido': {
                   templateUrl: 'templates/Menu-capture.html',
                   controller: 'ControladorCapture'
                }
          }
      })

  .state('Menu.deviceMotion', {
                url: '/deviceMotion',
                views: {
                  'contenido': {
                   templateUrl: 'templates/Menu-deviceMotion.html',
                   controller: 'ControladorDeviceMotion'
                }
          }
   })


.state('Menu.file', {
  url: '/file',
  views: {
    'contenido': {
      templateUrl: 'templates/Menu-file.html',
      controller: 'ControladorFile'
    }
  }
})

.state('Menu.barcodeScanner', {
                url: '/barcodeScanner',
                views: {
                  'contenido': {
                   templateUrl: 'templates/Menu-barcodeScanner.html',
                   controller: 'ControladorBarCode'
                }
          }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/root');

});

