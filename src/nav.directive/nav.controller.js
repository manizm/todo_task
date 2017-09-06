module.exports = ($scope) => {

  $scope.isSignup = false
  $scope.isForgotPassword = false


  $scope.checkisSignup = () => {
    $scope.isSignup = 
      $scope.$parent.showSignup = true

    $scope.isForgotPassword = 
      $scope.$parent.showForgotPassword = false
    
    $scope.$parent.showLogin = !$scope.$parent.showLogin
    console.log($scope)
  }


  $scope.checkisForgotPassword = () => { 
    $scope.isForgotPassword = 
      $scope.$parent.showForgotPassword = true

    $scope.isSignup = 
      $scope.$parent.showSignup = false

    $scope.$parent.showLogin = !$scope.$parent.showLogin
    console.log($scope)
  }


  $scope.showLogin = () => {
    $scope.$parent.showLogin = true
    $scope.$parent.showSignup = $scope.$parent.showForgotPassword = false
  }
  

  $scope.showPage = () => console.log($scope.page)
  
}