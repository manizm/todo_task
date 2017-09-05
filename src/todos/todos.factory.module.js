import angular from 'angular'

const todoFactoryModule = angular.module('app.todosFactoryModule', [])

.factory('todosFactory', () => {

  // helps in saving the task
  function saveTask($scope, dirtyInput) {
    dirtyInput.isDirty = false
    $scope.createTaskInput = ''
  }
  
  // does a shallow copying of original todo list
  // for editing outside of loop
  function editTask($scope, todo) {
    $scope.editingTask = todo
    $scope.editingTask.initEdit = true
  }
  
  // updates/edit the task
  function updateTask($scope, taskedited) {
    if (taskedited) {
      $scope.editingTask.task = taskedited
      $scope.editingTask.initEdit = false
    }
  }

  // removes the task
  function removeTask($scope, todo) {
    $scope.todos = $scope.todos
      .filter(item => item !== todo)
  }

  function watchCreateTaskInput($scope, dirtyInput, val) {
    // removes last letter from input
    
    if (!val && dirtyInput.isDirty) {
      $scope.todos.pop()
      dirtyInput.isDirty = false
    } 
    // pushes the task in todo list
    else if (val && !dirtyInput.isDirty) {
      $scope.todos.push({ task: val, isCompleted: false })
      dirtyInput.isDirty = true
    }
    // works as a model
    // adds/updates the value upon each key press
    // inside newly created task
    // otherwise only single letter will be stored
    else if (val && dirtyInput.isDirty) {
      $scope.todos[$scope.todos.length -1].task = val
    }
  }

  return {
    saveTask,
    editTask,
    updateTask,
    removeTask,
    watchCreateTaskInput
  }

})

export default todoFactoryModule