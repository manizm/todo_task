module.exports = ($scope, $http, $location, $window, $rootScope) => {
  $scope.authenticate = $rootScope.authenticated
  $scope.logout = function() {
    $http.get('/auth/signout')
    .then(response => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      $window.sessionStorage.current_user = ""
      console.log('current_user is: ', $window.sessionStorage.current_user, response)

      $location.path('/')
    })
  }

  $scope.$watch(function() {
    // console.log($window.sessionStorage)
    return $rootScope.authenticated
  }, function() {
    $scope.authenticate = $rootScope.authenticated
  }, true)
}