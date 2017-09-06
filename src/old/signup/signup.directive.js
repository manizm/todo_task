import signupcontroller from './signup.controller'
// import navcontroller from '../nav.directive/nav.controller'
class SignUp {
  constructor($interval) {
    this.restrict = 'E'
    this.template = require('./signup.directive.html')

    // this.require = logincontroller
    this.scope = {}

    this.controller = ['$scope', signupcontroller]

    this.link = function(scope, element, attrs, pageCtrl) {
      console.log(scope, element, attrs, pageCtrl)
    }
  }

} // end class

export default SignUp;