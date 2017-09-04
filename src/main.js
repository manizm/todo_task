import angular from 'angular'
import uiRouter from 'angular-ui-router'
import appModule from './config/main_config'
import navController from './navDirective/mainController'
import navDirective from './navDirective/navDirective'

// import bulma from 'bulma'
import css from './assets/styles/app.style.sass'


appModule.controller('navcontroller', navController)
appModule.directive('customnav', () => new navDirective)
