import angular from 'angular'
import io from 'socket.io-client'

/* FACTORY MODULE FOR TODOS CONTROLLER */

const todoFactoryModule = angular.module('app.todosFactoryModule', [])
.factory('todosFactory', ['$http', '$window', '$rootScope', ($http, $window, $rootScope) => {
  // console.log($window.sessionStorage.currentUser)

  // connect to socket
  const socket = io.connect('http://localhost:3000')
  
  /*
    we create a sockets object so we can pass it to the main todos controller
    inside, we imitate two methods of sockets
    this part was basically copy pasted :(
  */
  const sockets = {
    on: (eventName, callback) => {
      socket.on(eventName, function() {
        let args = arguments
        $rootScope.$apply(function() {
          callback.apply(socket, args)
        })
      })
    },
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        let args = arguments
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args)
          }
        })
      })
    }
  }

  // get all the tasks from server db
  function getAllTasks() {
    return $http.get(`/api/posts/all/${$window.sessionStorage.current_user}`)
  }

  /*
     update task to the db
     emit a socket event that server catches
     when server catches the event,
     it takes the response and passes it in another event
     that event is used it task delegation
  */
  function putTask(task) {
    socket.emit('taskAdded', task)
    return $http.put(`/api/posts/${task._id}`, task)
  }

  // delete a task from server db
  function deleteTask(task) {
    return $http.delete(`/api/posts/${task._id}`, task)
  }

  // adds a new task to the db
  function addTask(task) {
    return $http.post(`/api/posts`, task)
  }


  /* 
    helps in saving the task
    if we have any value in the add-task input
    then call addTask function and push last task in todo list to the db
    if addTask is succesfull then we call getAllTasks function
    this function returns a promise which we resolve by 
    updating our todos and users list
    We do this so we have unique task ID which our DB creates
    without this ID, it will be difficult to update that particular task
  */
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
  
  /* 
    does a shallow copying of original todo task from ng-repeat
    for editing outside of the loop
    by having a shallow copy, we make sure
    that if we change anything in it, this will be reflected in the
    original task
  */
  function editTask($scope, todo) {
    $scope.editingTask = todo
    $scope.editingTask.initEdit = true
  }
  
  /* 
    updates/edits the task
    This function is used in more than one model
    since it is used in more than one model, 
    we have to make sure what we are receiving
    we do this by checking if type of the value passed is not an object
    If it is not an object and just a value
    then we copy this value into editing task object to later use it
    ** see above editTask function for connected info **
    Otherwise, we simply pass this object to the putTask function
    this putTask function updates the task in Database
  */
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

  /*
    delegates task to another user
    upon selecting a user from delegate to dropdown list
    we first update the delegateTo key in task object
    then we close the dropdown menu
    then we update this modified task in database
  */
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
        username: angular.copy($window.sessionStorage.current_user),
        task: val,
        delegatedBy: angular.copy($window.sessionStorage.current_user),
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
    sockets,
    getAllTasks,
    putTask,
    saveTask,
    editTask,
    updateTask,
    removeTask,
    delegateTask,
    watchCreateTaskInput
  }

}])

export default todoFactoryModule