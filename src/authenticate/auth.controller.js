export default function($scope, $http, $location, $window, $rootScope) {

  // not used - for debugging purpose
  $scope.name = "LOGIN"

  // declare user and error message variables in scope
  $scope.user = {username: '', password: ''}
  $scope.error_message = ''

  /*
    -- see login.html for implementation --
    upon login, access the route specified in server
    send the user declared above to the server
    user is connected to view via ng-model
  */
  $scope.login = user => {
    $http.post('/auth/login', $scope.user)
    
    /*
      If posting is successful then change the authenticated flag to true
      this flag determines what to show in navigation menu
      Also store the current user in global window object
      this is done because of keeping the scope on page refresh
      otherwise catch error | flip the authenticated flags | show the error message
      finally move to the todos path via location provider
    */
    .then(response => {
      
      $window.sessionStorage.authenticated = $rootScope.authenticated = true
      $window.sessionStorage.current_user = angular.copy(response.data.user.username)
      $location.path('/todos')
      $scope.error_message = ''
    })
    .catch(err => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      $scope.error_message = 'Ivalid username or password'
    })
  }

  /*
    Same routine goes for signup as login
  */
  $scope.signup = user => {
    $http.post('/auth/signup', $scope.user)
    .then(response => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = true
      $window.sessionStorage.current_user = response.data.user.username
      $scope.error_message = ''
      // console.log('current_user is: ', $window.sessionStorage.current_user, response)
      $location.path('/todos')
    })
    .catch(err => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      $scope.error_message = 'Ivalid username or password'
    })
  }


  /*
    Same routine goes for forgotPass as login and signup
    except we stay on the same page
  */
  $scope.forgotPass = user => {
    $http.post('/auth/resetpassword', $scope.user).then(response => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      $window.sessionStorage.current_user = response.data.user.username
      $scope.error_message = ''
      $location.path('/')
    })
    .catch(err => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      $scope.error_message = 'Ivalid username or password'
      // console.log(err)
    })
  }
}