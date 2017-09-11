// Nav directive controller
module.exports = ($scope, $http, $location, $window, $rootScope) => {
  
  // Instantiate local scope's authenticate flag to rootScope's flag
  $scope.authenticate = $rootScope.authenticated

  /*
    Upon logout, access the route specified in server
    set the authenticated flags to false to change to navigation menu
    reset the current user
    move the location to root location
  */
  $scope.logout = function() {
    $http.get('/auth/signout')
    .then(response => {
      $window.sessionStorage.authenticated = $rootScope.authenticated = false
      $window.sessionStorage.current_user = ""
      // console.log('current_user is: ', $window.sessionStorage.current_user, response)

      $location.path('/')
    })
  }

  /* 
    We set a watcher on rootScope's authenticated flag
    this is to make sure we always have latest flag
    so our navigation menu shows correct links
  */
  $scope.$watch(function() {
    // console.log($window.sessionStorage)
    return $rootScope.authenticated
  }, function() {
    $scope.authenticate = $rootScope.authenticated
  }, true)
}