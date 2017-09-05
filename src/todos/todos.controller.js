export default function($scope, todosFactory) {
  // destructuring the todosFactory
  const { saveTask, editTask, updateTask, removeTask, watchCreateTaskInput } = todosFactory
  
  let dirtyInput = { isDirty: false }

  $scope.editingTask = {}
  
  $scope.todos = [
    {
      task: 'do dishes',
      isCompleted: true,
      initEdit: false
    },
    {
      task: 'complete the website',
      isCompleted: false,
      initEdit: false
    },
    {
      task: 'Do the express routing',
      isCompleted: false,
      initEdit: false
    }
  ]

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

  /* HELPER Methods */
  $scope.onCompletion = todo => todo.isCompleted = !todo.isCompleted

  $scope.closeModal = () => $scope.editingTask.initEdit = !$scope.editingTask.initEdit


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