import todosController from '../todos.controller'
class UserDropdownList {
  constructor($rootScope) {
    this.restrict = 'E'
    this.template = require('./users.dropdown.directive.html')
    this.transclude = true
    this.controller = ['$scope', '$rootScope', 'todosFactory', todosController]

    this.scope = { task: '=' }
  }

} // end class

export default UserDropdownList;