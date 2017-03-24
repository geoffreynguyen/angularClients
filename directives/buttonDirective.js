app.directive("buttonDirective", function ()
{
    return{
        restrict: 'E',
        transclude: true,
        scope: {
          value :'=value',
          type: '=type',
          id: '=id',
          callback: '&callback'
        },
        templateUrl: 'templates/button.html',
        controller: function($scope){
            $scope.onClick = $scope.$eval($scope.callback);
        }

    }
});
// thibault.roussel@gmail.com
// respo
// consigne (README)
// groupe
// marche et marche pas

//socket.io
