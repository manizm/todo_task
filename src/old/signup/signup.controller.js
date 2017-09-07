export default function($scope) {
  $scope.signupname = "Signup"
  $scope.signup = {
    username: 'Username',
    password: 'Password'
  }
  
  $scope.signup = user => $scope.signup = angular.copy(user)
}