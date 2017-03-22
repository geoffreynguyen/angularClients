app.directive("clientDirective", function ()
{
    return{
        restrict: 'E',
        templateUrl: 'templates/mainClient.html'
    }
});

app.directive("clientDetailDirective", function ()
{
    return{
        restrict: 'E',
        templateUrl: 'templates/detailClient.html'
    }
});

app.directive("clientFormDirective", function ()
{
    return{
        restrict: 'E',
        templateUrl: 'templates/form.html'
    }
});
