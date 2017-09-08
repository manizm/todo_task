module.exports = ($scope, $rootScope, $http, $location) => {
  /* TEMPORARY! REMOVE THEM AFTER SETTING UP BACKEND */
  // $scope.authenticated = $rootScope.authenticated
  // $scope.authenticated

  // $scope.authenticatetodo = () => {
  //   console.log($scope, $rootScope)
  //   $scope.authenticated = $rootScope.authenticated
    
  // }
  // $scope.authenticateauth = () => {
  //   console.log($scope, $rootScope)
  //   $scope.authenticated = $rootScope.authenticated
    
  // }
  $scope.logout = function() {
    $http.get('/auth/signout')
    .then(response => {
      $rootScope.authenticated = false
      $rootScope.current_user = ""
      console.log('current_user is: ', $rootScope.current_user, response)

      $location.path('/')
    })
  }

  $scope.$watch(function() {
    return $rootScope.authenticated
  }, function() {
    $scope.authenticate = $rootScope.authenticated
  }, true)
}