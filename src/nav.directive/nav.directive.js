import navController from './nav.controller'
class NavBar {
  constructor($interval) {
    this.restrict = 'E'
    this.template = require('./nav.directive.html')

    this.controller = ['$scope', navController]

    this.scope = {
      pageis: '=pagename'
    }
    this.link = function(scope, element, attrs, pageCtrl) {
      scope.page = attrs.pagename
    }
  }

} // end class

export default NavBar;