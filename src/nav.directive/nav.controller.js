module.exports = ($scope, $rootScope, $http, $location) => {
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