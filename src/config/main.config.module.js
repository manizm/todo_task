import angular from 'angular'
import uiRouter from 'angular-ui-router'
import todosFactoryModule from '../todos/todos.factory.module'
import todosController from '../todos/todos.controller'
import authController from '../authenticate/auth.controller'

// Instantiate angular main module
const app = angular.module('app', [uiRouter, todosFactoryModule.name])


/*
  Configuration of app module
  we use uiRouter for client side routing
  $provide dependency to take care of server routing
  ^ most likely won't need it since I am not using html5Mode
*/
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide', ($stateProvider, $urlRouterProvider, $locationProvider, $provide) => {
  $urlRouterProvider.otherwise('/')
  
  /* 
    to take care of hashbangs and server routing
    most likely wont be needed since I am not using html5Mode
  */
  $provide.decorator('$log',['$sniffer', function($delegate) {
    $delegate.history = false
    return $delegate
  }])


  // ROUTES
  $stateProvider
    .state('login', {
      url: '/',
      template: require('../authenticate/login.html'),
      controller: ['$scope','$http', '$location', '$window', '$rootScope', authController]
    })
    .state('todos', {
      url: '/todos',
      template: require('../todos/todos.html'),
      controller: ['$scope', 'todosFactory', '$window', todosController]
    })
    .state('signup', {
      url: '/auth/signup',
      template: require('../authenticate/signup.html'),
      controller: ['$scope', '$http', '$location', '$window', '$rootScope', authController]
    })
    .state('forgotpassword', {
      url: '/auth/forgotpassword',
      template: require('../authenticate/forgotpassword.html'),
      controller: ['$scope', '$http', '$location', '$window', '$rootScope', authController]
    })


  $locationProvider.html5Mode(true).hashPrefix('')
  
}])

export default app;