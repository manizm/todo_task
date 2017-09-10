export default function($scope, $http, $location, $window, $rootScope) {

  $scope.name = "LOGIN"

  $scope.user = {username: '', password: ''}
  $scope.error_message = ''

  $scope.login = user => {
    // TODO
    // send the user via http post and handle returned message
    // console.log('login', user)
    $http.post('/auth/login', $scope.user)
    .then(response => {
      
      $window.sessionStorage.authenticated = $rootScope.authenticated = true
      $window.sessionStorage.current_user = angular.copy(response.data.user.username)
      console.log('here')
      $location.path('/todos')
    })
    .catch(err => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      $scope.error_message = 'Ivalid username or password'
    })
  }

  $scope.signup = user => {
    // TODO
    // send the user via http post and handle returned message
    // console.log('signup', user)
    $http.post('/auth/signup', $scope.user)
    .then(response => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = true
      $window.sessionStorage.current_user = response.data.user.username
      console.log('current_user is: ', $window.sessionStorage.current_user, response)

      $location.path('/todos')
    })
    .catch(err => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      $scope.error_message = 'Ivalid username or password'
    })
  }

  $scope.forgotPass = user => {
    // TODO
    // send the user via http post and handle returned message
    // console.log('forgot password', user)
    $http.post('/auth/resetpassword', $scope.user).then(response => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      // $rootScope.current_user = response.data.user.username
      console.log('current_user is: ', $window.sessionStorage.current_user)

      $location.path('/')
    })
    .catch(err => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      $scope.error_message = 'Ivalid username or password'
      console.log(err)
    })
  }
}