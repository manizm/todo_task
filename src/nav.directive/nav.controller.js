module.exports = ($scope, $rootScope) => {
  /* TEMPORARY! REMOVE THEM AFTER SETTING UP BACKEND */
  $scope.authenticated = $rootScope.authenticated
  $scope.authenticatetodo = () => {
    console.log($scope, $rootScope)
    $scope.authenticated= $rootScope.authenticated = true
    
  }
  $scope.authenticateauth = () => {
    console.log($scope, $rootScope)
    $scope.authenticated = $rootScope.authenticated = false
    
  }
}