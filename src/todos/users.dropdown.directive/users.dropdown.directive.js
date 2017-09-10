import todosController from '../todos.controller'
class UserDropdownList {
  constructor($window) {
    this.restrict = 'E'
    this.template = require('./users.dropdown.directive.html')
    this.transclude = true
    this.controller = ['$scope', 'todosFactory', '$window', todosController]

    this.scope = { task: '=' }
  }

} // end class

export default UserDropdownList;