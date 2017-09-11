import navController from './nav.controller'

// Navbar directive constructor class
class NavBar {
  constructor($window, $rootScope) {
    this.restrict = 'E'
    this.template = require('./nav.directive.html')
    this.transclude = true
    this.replace = true
    this.controller = ['$scope', '$http', '$location', '$window', '$rootScope', navController]

    /* 
      we set the scope for debugging purpose
      not used anywhere for production
    */
    this.scope = {
      pageis: '=pagename'
    }
    this.link = function(scope, element, attrs, pageCtrl) {
      scope.page = attrs.pagename
    }
  }

} // end class

export default NavBar;