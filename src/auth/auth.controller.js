export default function($scope, $rootScope) {

  $scope.name = "LOGIN"

  $scope.user = {username: '', password: ''}
  $scope.error_message = ''


  $scope.login = user => {
    // TODO
    // send the user via http post and handle returned message
    console.log('login', user)
  }

  $scope.signup = user => {
    // TODO
    // send the user via http post and handle returned message
    console.log('signup', user)
  }

  $scope.forgotPass = user => {
    // TODO
    // send the user via http post and handle returned message
    console.log('forgot password', user)
  }
}