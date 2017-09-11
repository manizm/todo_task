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
  /* 
    we set the authenticated flag
    to be same as we have already set in window object during login process
    we do this for easy retrieval
    and reupdating the rootscope upon page refresh
  */
  $rootScope.authenticated = $window.sessionStorage.authenticated
  // $window.sessionStorage.current_user = ''
  
}])

// declaring the controllers because of dependency issues D:
appModule.controller('todosController', ['$scope', 'todosFactory', '$window', todosController])
appModule.controller('authController', ['$scope', '$http', '$location', '$window', '$rootScope', authController])
appModule.controller('navcontroller', ['$scope', '$http', '$location', '$window', '$rootScope', navController])

appModule.directive('customnav', () => new NavDirective)
appModule.directive('userdropdown', () => new UserDropdownList)

