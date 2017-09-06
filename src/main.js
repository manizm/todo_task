import angular from 'angular'
import uiRouter from 'angular-ui-router'
import appModule from './config/main.config.module'

import navController from './nav.directive/nav.controller'
import signupController from './signup/signup.controller'
import forgotPasswordController from './forgotPassword/forgotPassword.controller'

import NavDirective from './nav.directive/nav.directive'
import SignupDirective from './signup/signup.directive'
import ForgotPasswordDirective from './forgotPassword/forgotPassword.directive'

// import bulma from 'bulma'
import 'font-awesome-sass-loader'
import './assets/styles/app.style.sass'



appModule.controller('navcontroller', navController)
// appModule.controller('signupcontroller', signupController)
appModule.directive('customnav', () => new NavDirective)
appModule.directive('signupform', () => new SignupDirective)
appModule.directive('forgotpassword', () => new ForgotPasswordDirective)

