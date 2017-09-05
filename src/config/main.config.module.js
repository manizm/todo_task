import angular from 'angular'
import uiRouter from 'angular-ui-router'
import todosFactoryModule from '../todos/todos.factory.module'
import todosController from '../todos/todos.controller'

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
      url: '/login',
      template: require('../login/login.html')
    })
    .state('signup', {
      url: '/signup',
      template: require('../signup/signup.html')
    })

  $locationProvider.html5Mode(true)
  
}])

export default app;