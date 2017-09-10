export default function($scope, todosFactory, $window) {
  
  // destructuring the todosFactory
  const { putTask, saveTask, editTask, updateTask, removeTask, delegateTask, watchCreateTaskInput } = todosFactory
  let dirtyInput = { isDirty: false }
  $scope.isDropdown = false
  $scope.editingTask = {}
  $scope.todos = []
  $scope.users = []
  $scope.currentUser = angular.copy($window.sessionStorage.current_user)
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

  $scope.delegateTask = delegateTask
    .bind(this, $scope)


  /* HELPER Methods */
  $scope.onCompletion = todo => {
    todo.isCompleted = !todo.isCompleted
    $scope.updateTask(todo)
  }

  $scope.closeModal = () => $scope.editingTask.initEdit = !$scope.editingTask.initEdit
  
  // toggle dropdown and set position of dropdown
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