// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngMessages','ngCordova','firebase'])

.run(function ($ionicPlatform) {

  //Parse.initialize("Xa9XMOcSQMQy9n4PPJUJ5Fzn86z5xxWBPMW6CAaD", "Ieq0GSlXOliG9affHfSVl77ManiGDHNWUP2xdTDk");
  
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

  // setup an abstract state for the tabs directive
  .state('login', {
    url: '/login',
    cache:false,
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('registerUser', {
    url: '/registerUser',
    cache:false,
    templateUrl: 'templates/register_user.html',
    controller: 'LoginCtrl'
  })
  .state('home', {
    url: '/home',
    cache:false,
    abstract:true,
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })
  .state('home.summary',{
    url:'/summary',
    cache:false,
    views:{
      'home-summary':{
        templateUrl:'templates/home_summary.html'      
      }
    }
  })
  .state('home.contacts',{
    url:'/contacts',
    cache:false,
    views:{
      'home-contacts':{
        templateUrl:'templates/contacts.html',
        controller:'ContactsCtrl'
      }
    }
  })
  .state('addTask',{
    url:'/addTask',
    cache:false,
    templateUrl:'templates/addTask.html',
    controller:'AddTaskCtrl'
  })
  // .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })

  // // Each tab has its own nav history stack:

  // .state('tab.list', {
  //   url: '/list',
  //   views: {
  //     'tab-list': {
  //       templateUrl: 'templates/list.html',
  //       controller: 'ListCtrl'
  //     }
  //   }
  // })

  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab-chats.html',
  //         controller: 'ChatsCtrl'
  //       }
  //     }
  //   })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})
.constant('FirebaseUrl', 'https://boiling-torch-5711.firebaseio.com/');

