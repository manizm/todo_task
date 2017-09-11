import todosController from '../todos.controller'

/* 
  Dropdown list directive constructor class
  this will be used in todos.html
  Uses todosController for interaction

  PURPOSE:
  Shows a dropdown list when a person clicks on delegate task
  this dropdown list shows usernames of all users in databse
  by clicking on any of these names, you can delegate a task to another user
*/
class UserDropdownList {
  constructor($window) {
    this.restrict = 'E'
    this.template = require('./users.dropdown.directive.html')
    this.transclude = true
    this.controller = ['$scope', 'todosFactory', '$window', todosController]

    // we pass the particular task from todo.html
    // this passed task is basically taken from ng-repeat
    this.scope = { task: '=' }
  }

} // end class

export default UserDropdownList;