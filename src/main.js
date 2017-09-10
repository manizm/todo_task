import angular from 'angular'
import uiRouter from 'angular-ui-router'
import appModule from './config/main.config.module'
// import localStorage from 'angular-local-storage'

import navController from './nav.directive/nav.controller'
import todosController from './todos/todos.controller'
import authController from './authenticate/auth.controller'

import NavDirective from './nav.directive/nav.directive'
import UserDropdownList from './todos/users.dropdown.directive/users.dropdown.directive'

// import bulma from 'bulma'
import 'font-awesome-sass-loader'
import './assets/styles/app.style.sass'


appModule.run(['$rootScope', '$http', '$window', ($rootScope, $http, $window) => {
  $rootScope.authenticated = $window.sessionStorage.authenticated
  // $window.sessionStorage.current_user = ''
  
}])
appModule.controller('mainController', ['$stateParams', ($stateParams) => { 
  if (!$stateParams.id) $stateParams.id = ''
}])
appModule.controller('todosController', ['$scope', 'todosFactory', '$window', todosController])
appModule.controller('authController', ['$scope', '$http', '$location', '$window', '$rootScope', authController])
appModule.controller('navcontroller', ['$scope', '$http', '$location', '$window', '$rootScope', navController])

appModule.directive('customnav', () => new NavDirective)
appModule.directive('userdropdown', () => new UserDropdownList)

