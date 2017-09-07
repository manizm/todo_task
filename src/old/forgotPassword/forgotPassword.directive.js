import forgotPasswordcontroller from './forgotPassword.controller'
// import navcontroller from '../nav.directive/nav.controller'
class ForgotPassword {
  constructor($interval) {
    this.restrict = 'E'
    this.template = require('./forgotPassword.html')


    this.scope = {}

    this.controller = ['$scope', forgotPasswordcontroller]

    this.link = function(scope, element, attrs, pageCtrl) {
      console.log(scope)
    }
  }

} // end class

export default ForgotPassword