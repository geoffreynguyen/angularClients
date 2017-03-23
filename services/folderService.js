app.factory('folderFactory', function($http){
  var factory = {
    getAllFolder: function() {
      return $http.get('http://localhost:8888/folders');
    },
    getFolderByClientId: function(id) {
      return $http.get('http://localhost:8888/client/'+id+'/folder/');
    },
    getFolder: function(id){
      return $http.get('http://localhost:8888/folder/'+id);
    },
    addFolder: function(folder){
      return $http.post('http://localhost:8888/folders/',folder);
    },
    deleteFolder: function(id){
      return $http.delete('http://localhost:8888/folder/'+id);
    },
    modifyFolder : function(id, folderUpdate){
      return $http.put('http://localhost:8888/folder/'+id,folderUpdate);
    }

  }

  return factory;
});
