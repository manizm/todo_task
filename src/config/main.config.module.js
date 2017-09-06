import angular from 'angular'
import uiRouter from 'angular-ui-router'
import todosFactoryModule from '../todos/todos.factory.module'
import todosController from '../todos/todos.controller'
import authController from '../auth/auth.controller'

const app = angular.module('app', [uiRouter, todosFactoryModule.name])

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('todos', {
      url: '/',
      template: require('../todos/todos.html'),
      controller: todosController
    })
    .state('login', {
      url: '/auth/login',
      template: require('../auth/login.html'),
      controller: authController
    })
    .state('signup', {
      url: '/auth/signup',
      template: require('../auth/signup.html'),
      controller: authController
    })
    .state('forgotpassword', {
      url: '/auth/forgotpassword',
      template: require('../auth/forgotpassword.html'),
      controller: authController
    })

  $locationProvider.html5Mode(true)
  
}])

export default app;