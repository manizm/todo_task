class NavBar {
  constructor($interval) {
    this.restrict = 'E'
    this.template = require('./navDirective.html')

    this.scope = {pageis: '=pagename'}
  }

} // end class

export default NavBar;