export default function($scope) {
  $scope.passwordname = "Forgot Password"
  $scope.forgotPassword = {
    username: 'Username',
    password: 'Password'
  }
  
  $scope.forgotPassword = user => $scope.forgotPassword = angular.copy(user)
}