import navController from './nav.controller'
class NavBar {
  constructor($window, $rootScope) {
    this.restrict = 'E'
    this.template = require('./nav.directive.html')
    this.transclude = true
    this.replace = true
    this.controller = ['$scope', '$http', '$location', '$window', '$rootScope', navController]

    this.scope = {
      pageis: '=pagename'
    }
    this.link = function(scope, element, attrs, pageCtrl) {
      scope.page = attrs.pagename
    }
  }

} // end class

export default NavBar;