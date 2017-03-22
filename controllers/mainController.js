app.controller('clientCtrl', function($scope, clientFactory){

  $scope.getAllClients = function() {
    $scope.loading = true;
    $scope.clients = [];
    $scope.edit = false;
    $scope.clientDetail = [];
    $scope.newClient = [];

    var promise = clientFactory.getAllClient();
    promise.then(function(response) {
      console.log('depuis mon ctrl', response)
      $scope.clients = response.data;
      $scope.loading = false;
    }, function(reason) {
      console.log(reason);
    });

  };

  $scope.getClientById = function(id, edit=false){
    var promise = clientFactory.getClient(id);
    $scope.edit = edit;
    promise.then(function(response) {
      console.log('Depuis ma function getClientById', response)
      $scope.clientDetail = response.data[0];
      $scope.loading = false;
    }, function(reason) {
      console.log(reason);
    });
  };

  $scope.updateClientById = function(){
    var promise = clientFactory.modifyClient($scope.clientDetail._id, {'nom':$scope.clientDetail.nom, 'prenom':$scope.clientDetail.prenom});
    promise.then(function(response) {
      console.log('Depuis ma function updateClientById', response)
      $scope.getAllClients();
    }, function(reason) {
      console.log(reason);
    });
  };

  $scope.addClient = function(){
    var promise = clientFactory.addClient({'nom':$scope.newClient.nom, 'prenom':$scope.newClient.prenom});
    promise.then(function(response) {
      console.log('Depuis ma function addClient', response)
      $scope.getAllClients();
    }, function(reason) {
      console.log(reason);
    });
  };

  $scope.deleteClient = function(id){
    var promise = clientFactory.deleteClient(id);
    promise.then(function(response) {
      console.log('Depuis ma function deleteClient', response)
      $scope.getAllClients();
    }, function(reason) {
      console.log(reason);
    });
  };

  $scope.getAllClients();
});
