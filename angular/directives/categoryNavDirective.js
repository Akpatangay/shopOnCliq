app.directive("categoryNavDirective", ['dataService', '$routeParams', function(dataService, $routeParams) {
    return {
        restrict: "E", // restrict element
        templateUrl: "templates/categoryNavTemplate.html",
        controller : 'categoryController',
        controllerAs : 'category' 
    };
}]);