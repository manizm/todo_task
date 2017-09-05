export default function($scope) {
  let dirtyInput = false

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

  $scope.saveTask = () => {
    dirtyInput = false
    $scope.taskInput = ''
  }

  $scope.editTask = todo => {
    todo.initEdit = true
    $scope.editingTask.initEdit = true
    // do a shallow copy of todo item
    // so it can be updated upon updating editingTask
    $scope.editingTask = todo
  }

  $scope.removeTask = todo => {
    $scope.todos = $scope.todos.filter(item => item !== todo)
  }

  $scope.updateTask = taskedited => {
    if (taskedited) {
      $scope.editingTask.task = taskedited
      $scope.editingTask.initEdit = false
    }
  }

  $scope.closeModal = () => $scope.editingTask.initEdit = !$scope.editingTask.initEdit

  $scope.$watch('taskInput', val => {
    if (!val && dirtyInput) {
      $scope.todos.pop()
      dirtyInput = false
    } else if (val && !dirtyInput) {
      $scope.todos.push({ task: val, isCompleted: false })
      dirtyInput = true
    } else if (val && dirtyInput) {
      $scope.todos[$scope.todos.length -1].task = val
    }
  })
}