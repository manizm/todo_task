export default function($scope, $state) {
  $scope.name = "LOGIN"
  $scope.showSignup = false
  $scope.showForgotPassword = false
  $scope.showLogin = true
  $scope.login = user => {
    console.log($state)
  }
}