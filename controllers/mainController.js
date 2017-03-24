app.controller('clientCtrl', function($scope, clientFactory, folderFactory){

  $scope.getAllClients = function() {
    $scope.loading = true;
    $scope.clients = [];
    $scope.clientsHeaders = ["nom","prenom"];
    $scope.clientsButton = [{
      "type":"button",
      "ng-click":"getClientById(client._id)",
      "value":"Voir",
      "method":function(id){
        console.log(id);
        return $scope.getClientById(id);
      }
    }];
    $scope.filtHeader = "nom";
    $scope.edit = false;
    $scope.editFolder = false;
    $scope.clientDetail = [];
    $scope.newClient = [];
    $scope.infos = [];
    $scope.newInfos = [];
    $scope.infosFolder = [];

    var promise = clientFactory.getAllClient();
    promise.then(function(response) {
      console.log('depuis mon ctrl', response)
      $scope.clients = response.data;
      $scope.loading = false;
    }, function(reason) {
      console.log(reason);
    });

  };

  $scope.test = function(){
    console.log("ok");
  }

  $scope.getClientById = function(id, edit=false){
    $scope.infosFolder = [];
    $scope.newInfos = [];
    var promise = clientFactory.getClient(id);
    $scope.edit = edit;
    promise.then(function(response) {
      console.log('Get Client', response);
      var promiseFolder = folderFactory.getFolderByClientId(id);
      promiseFolder.then(function(response) {
        console.log('Get Folder of Client', response)
        if (response.data.length != 0) {
          $scope.infosFolder = response.data;
        }
      }, function(reason) {
        console.log(reason);
      });
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
      console.log('Client deleted', response)
      var promiseFolder = folderFactory.deleteFolder(id);
      promiseFolder.then(function(response) {
        console.log('Folder deleted', response)
      }, function(reason) {
        console.log(reason);
      });
      $scope.getAllClients();
    }, function(reason) {
      console.log(reason);
    });

  };

  $scope.deleteFolder = function(id) {
    var promiseFolder = folderFactory.deleteFolder(id);
    promiseFolder.then(function(response) {
      console.log('Folder deleted', response)
    }, function(reason) {
      console.log(reason);
    });

    $scope.getClientById($scope.clientDetail._id);
  };

  $scope.updateInfosById = function(){
    var promise = folderFactory.modifyFolder($scope.infos._id, {'created':$scope.infos.created, 'client_id':$scope.infos.client_id, 'last_call':$scope.infos.last_call, 'last_problem':$scope.infos.last_problem});
    promise.then(function(response) {
      console.log('Depuis ma function updateInfosById', response)
      $scope.getClientById($scope.infos.client_id);
    }, function(reason) {
      console.log(reason);
    });
  };

  $scope.addInfos = function(){
    var promise = folderFactory.addFolder({'created':$scope.newInfos.created, 'client_id':$scope.clientDetail._id, 'last_call':$scope.newInfos.last_call, 'last_problem':$scope.newInfos.last_problem});
    promise.then(function(response) {
      console.log('Depuis ma function addFolder', response)
      $scope.getClientById($scope.clientDetail._id);
    }, function(reason) {
      console.log(reason);
    });

  };

  $scope.addInfosBool = function(bool){
    if (!bool) {
      $scope.editFolder = true;
    }
    $scope.editFolder = false;
  };

  $scope.getFolderById = function(id, editFolder=false){
    $scope.editFolder = editFolder;
    var promiseFolder = folderFactory.getFolder(id);
    promiseFolder.then(function(response) {
      console.log('Get Folder of Client', response)
      if (response.data.length != 0) {
        $scope.infos = response.data[0];
      }
    }, function(reason) {
      console.log(reason);
    });
  };

  $scope.getAllClients();
});
