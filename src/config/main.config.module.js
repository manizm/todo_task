import angular from 'angular'
import uiRouter from 'angular-ui-router'
import todosFactoryModule from '../todos/todos.factory.module'
import todosController from '../todos/todos.controller'
import authController from '../authenticate/auth.controller'

const app = angular.module('app', [uiRouter, todosFactoryModule.name])

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('login', {
      url: '/',
      template: require('../authenticate/login.html'),
      controller: authController
    })
    .state('todos', {
      url: '/todos',
      template: require('../todos/todos.html'),
      controller: todosController
    })
    .state('signup', {
      url: '/auth/signup',
      template: require('../authenticate/signup.html'),
      controller: authController
    })
    .state('forgotpassword', {
      url: '/auth/forgotpassword',
      template: require('../authenticate/forgotpassword.html'),
      controller: authController
    })
    // .state('logout', {
    //   url: '/',
    //   controller: todosController
    // })

  $locationProvider.html5Mode(true)
  
}])

export default app;