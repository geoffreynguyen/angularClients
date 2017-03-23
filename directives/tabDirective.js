app.directive("tabDirective", function ()
{
    return{
        restrict: 'E',
        scope: {
          headers:'=headers',
          data: '=data',
          headToFilter: '=filter',
          buttons: '=buttons'
        },
        controller:function($scope){
          $scope.getButton = function(button){
            console.log(button);
            return $scope.trustAsHtml(button);
          };
        },
        templateUrl: 'templates/tabCustom.html'

    }
});
