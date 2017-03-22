app.factory('clientFactory', function($http){
  var factory = {
    getAllClient: function() {
      return $http.get('http://localhost:8888/clients');
    },
    getClient: function(id) {
      return $http.get('http://localhost:8888/client/'+id);
    },
    addClient: function(client){
      return $http.post('http://localhost:8888/client/',client);
    },
    deleteClient: function(id){
      return $http.delete('http://localhost:8888/client/'+id);
    },
    modifyClient : function(id, clientUpdate){
      return $http.put('http://localhost:8888/client/'+id,clientUpdate);
    }

  }

  return factory;
});
