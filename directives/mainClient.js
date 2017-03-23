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

app.directive("clientInfosFormDirective", function ()
{
    return{
        restrict: 'E',
        templateUrl: 'templates/formInfos.html'
    }
});

app.directive("clientInfosDirective", function ()
{
    return{
        restrict: 'E',
        templateUrl: 'templates/detailInfos.html'
    }
});
