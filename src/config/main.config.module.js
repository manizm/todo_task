import angular from 'angular'
import uiRouter from 'angular-ui-router'
import todosFactoryModule from '../todos/todos.factory.module'
import todosController from '../todos/todos.controller'
import authController from '../authenticate/auth.controller'


const app = angular.module('app', [uiRouter, todosFactoryModule.name])

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide', ($stateProvider, $urlRouterProvider, $locationProvider, $provide) => {
  $urlRouterProvider.otherwise('/')
  
  // to take care of hashbangs and server routing
  $provide.decorator('$log',['$sniffer', function($delegate) {
    $delegate.history = false
    return $delegate
  }])

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
    // .state('logout', {
    //   url: '/',
    //   controller: todosController
    // })

  $locationProvider.html5Mode(true).hashPrefix('')
  
}])

export default app;