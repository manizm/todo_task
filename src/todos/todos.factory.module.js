import angular from 'angular'

const todoFactoryModule = angular.module('app.todosFactoryModule', [])

.factory('todosFactory', ($rootScope, $http) => {

  // get all the tasks from server
  function getAllTasks() {
    return $http.get(`/api/posts/all/${$rootScope.current_user}`)
  }

  // update task to the db
  function putTask(task) {
    return $http.put(`/api/posts/${task._id}`, task)
  }

  function deleteTask(task) {
    return $http.delete(`/api/posts/${task._id}`, task)
  }

  // adds a new task to the db
  function addTask(task) {
    return $http.post(`/api/posts`, task)
  }

  // helps in saving the task
  function saveTask($scope, dirtyInput) {
    if (dirtyInput.isDirty) {
      // push the last task in the todo list to the db since it is the latest one!
      addTask($scope.todos[$scope.todos.length - 1])
      .then(result => {
        getAllTasks()
        .then((response) => {
          console.log(response)
          $scope.todos = response.data.task
          $scope.users = response.data.users
        }).catch(err => {
          console.log("something is wrong in retreiving tasks")
        })
      })
      .catch(err => console.log("Something went wrong at posting new task"))
    }
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
      // creating deep copy so of taskedited so it can be changed without affecting anything
      if (typeof taskedited !== 'object') {
        $scope.editingTask.task = angular.copy(taskedited)
        $scope.editingTask.initEdit = false
      }
      // handle passed argument so we don't accidentally pass wrong keys
      taskedited = typeof taskedited === 'object' ? taskedited : $scope.editingTask
      putTask(taskedited)
      .then((response) => {
        console.log(response)
      }).catch(err => {
        console.log("something is wrong in putting tasks")
      })
    }
  }

  // removes the task
  function removeTask($scope, todo) {
    deleteTask(todo)
    .then(response => console.log(response))
    .catch(err => console.log(err))
    $scope.todos = $scope.todos
      .filter(item => item !== todo)
  }

  // delegates task to another user
  function delegateTask($scope, task, user) {
    task.delegatedTo = user.username
    $scope.isDropdown = false
    putTask(task)
    .then((response) => {
      console.log(response)
    }).catch(err => {
      console.log("something is wrong in putting tasks")
    })
  }

  // Watches task input in add task field and adds its to the list
  function watchCreateTaskInput($scope, dirtyInput, val) {
    // removes last letter from input
    
    if (!val && dirtyInput.isDirty) {
      $scope.todos.pop()
      dirtyInput.isDirty = false
    } 
    // pushes the task in todo list
    else if (val && !dirtyInput.isDirty) {
      const todo = {
        username: $rootScope.current_user,
        task: val,
        delegatedBy: $rootScope.current_user,
        isCompleted: false
      }
      $scope.todos.push(todo)
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
    getAllTasks,
    putTask,
    saveTask,
    editTask,
    updateTask,
    removeTask,
    delegateTask,
    watchCreateTaskInput
  }

})

export default todoFactoryModule