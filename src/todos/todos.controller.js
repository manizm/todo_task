import io from 'socket.io-client'
/*
  Main todos controller
  uses todosFactory for most of the implementation logic
  Some logics are defined here which are just mostly helper functions
*/

export default function($scope, todosFactory, $window) {
  
  // destructuring the todosFactory
  const { sockets, putTask, saveTask, editTask, updateTask, removeTask, delegateTask, watchCreateTaskInput } = todosFactory
  
  // a flag to check if add-task input has any text inside
  let dirtyInput = { isDirty: false }
  
  // flag to show dropdown for users
  $scope.isDropdown = false

  // temporary object that helps in creating a new task
  $scope.editingTask = {}
  
  /*
    these are the main models
    todos holds all the tasks
    users holds all the usernames to be used to task delegation
  */
  $scope.todos = []
  $scope.users = []
  

  /* 
    Set the current user as the user that we set in window object during login process
    This will be used in various locations
  */
  $scope.currentUser = angular.copy($window.sessionStorage.current_user)
  

  /*
    Looks for the delegatedTo event fired from the server
    When the event occurs, we receive a task
    we check if the task is related to the current user
    then we push it to the main todos model
  */
  sockets.on('delegatedTo', task => {
    if ($scope.currentUser === task.delegateTo) {
      $scope.todos.push(task)
    }
  })


  /*
    This gets all the tasks from server as soon as todos page loads
    upon successful response, we push all the tasks to main todos model
    and users to users model
  */
  todosFactory.getAllTasks()
  .then((response) => {
    // console.log(response)
    $scope.todos = response.data.task
    $scope.users = response.data.users
  }).catch(err => {
    console.log("something is wrong in retreiving tasks")
  })

  /* 
    ran after createTaskInput model is watched
    and add Task button has been clicked
    empties the createTaskInput ng-model
    switches the isDirty flag
    switching reports createTaskInput watcher to handle the task
  */
  $scope.saveTask = saveTask
    .bind(this, $scope, dirtyInput)

  /*
    do a shallow copy of todo item
    so it can be updated upon updating editingTask
  */
  $scope.editTask = editTask
    .bind(this, $scope)

  /*
    takes todo item as parameter
    filters the todo item through all the task
    returns a new array
  */
  $scope.removeTask = removeTask
    .bind(this, $scope)

  /*
    get the value from ng-model taskedited
    pass it as parameter
    update the editingTask object
    updates/edits referenced todo task
  */
  $scope.updateTask = updateTask
    .bind(this, $scope)


  /*
    This helps in delegating a task to the user
    a user is selected through dropdown menu in the list
    and is passed the selected task and user
    this selected task and user is then used to
    1) Update the task in database
    2) Emit a socket event that can be seen by other users
  */
  $scope.delegateTask = delegateTask
    .bind(this, $scope)


  /* HELPER Methods */

  /*
    changes the completed flag of a particular task
    updates the task into database
  */
  $scope.onCompletion = todo => {
    todo.isCompleted = !todo.isCompleted
    $scope.updateTask(todo)
  }

  // helps in closing the edit task modal
  $scope.closeModal = () => $scope.editingTask.initEdit = !$scope.editingTask.initEdit
  
  // toggles the dropdown and sets position of dropdown
  $scope.showDropdown = ($event) => {
    $scope.isDropdown = !$scope.isDropdown
    if ($event !== undefined)
      setDropdownBounds($event.currentTarget)
  }

  /*
    This function is used because even though it is 2017
    and we are thinking of going to mars,
    and we have css4 on the way;
    We are still stuck with issues in overflow property!
    I mean fucking damn it CSS!!
    Setting overflow-x: auto and/or overflow-y: visible/unset
    is exactly like overflow: auto!!

    In short - it moves the user dropdown list in correct position
  */
  function setDropdownBounds(el) {
    let dropdownBounds = el.getBoundingClientRect() 
    let dropdown = el.nextElementSibling
    
    dropdown.style.top = dropdownBounds.top + 35 + 'px'
    dropdown.style.left = dropdownBounds.left + 'px'

  }


  /*
    Watches the createTaskInput ng-model
    uses isDirty flag
    adds a new task based on its model
    and isDirty flag
  */
  $scope.$watch('createTaskInput', 
    watchCreateTaskInput
      .bind(this, $scope, dirtyInput))
}