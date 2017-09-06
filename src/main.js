import angular from 'angular'
import uiRouter from 'angular-ui-router'
import appModule from './config/main.config.module'

import navController from './nav.directive/nav.controller'
import todosController from './todos/todos.controller'
import authController from './auth/auth.controller'
// import signupController from './signup/signup.controller'
// import forgotPasswordController from './forgotPassword/forgotPassword.controller'

import NavDirective from './nav.directive/nav.directive'
import UserDropdownList from './todos/users.dropdown.directive/users.dropdown.directive'
// import SignupDirective from './signup/signup.directive'
// import ForgotPasswordDirective from './forgotPassword/forgotPassword.directive'

// import bulma from 'bulma'
import 'font-awesome-sass-loader'
import './assets/styles/app.style.sass'


appModule.run($rootScope => {
  $rootScope.authenticated = false
  $rootScope.current_user = ''
})

appModule.controller('todosController', todosController)
appModule.controller('authController', authController)
appModule.controller('navcontroller', navController)
// appModule.controller('signupcontroller', signupController)
appModule.directive('customnav', () => new NavDirective)
appModule.directive('userdropdown', () => new UserDropdownList)
// appModule.directive('signupform', () => new SignupDirective)
// appModule.directive('forgotpassword', () => new ForgotPasswordDirective)

