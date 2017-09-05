import angular from 'angular'
import uiRouter from 'angular-ui-router'
import appModule from './config/main.config.module'
import navController from './nav.directive/nav.controller'
import navDirective from './nav.directive/nav.directive'
// import bulma from 'bulma'
import 'font-awesome-sass-loader'
import './assets/styles/app.style.sass'



appModule.controller('navcontroller', navController)
appModule.directive('customnav', () => new navDirective)
