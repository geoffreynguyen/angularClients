app.factory('clientFactory', function($http){
  var factory = {
    listClient : [
      {
        nom : 'Dupont',
        prenom : 'Jean',
        mail : 'jean@dupont.fr'
      }, {
        nom : 'Durand',
        prenom : 'Christine',
        mail : 'christine@durand.fr'
      },
    ],
    getAllClient: function() {
      return $http.get('http://localhost:8888/clients');
    }
  }

  return factory;
});
