app.controller('clientCtrl', function($scope, clientFactory){

  var promise = clientFactory.getAllClient();
  $scope.loading = true;
  $scope.clients = [];
  promise.then(function(response) {
    console.log('depuis mon ctrl', response)
    $scope.clients = response.data;
    $scope.loading = false;
  }, function(reason) {
    console.log(reason);
  });
});
