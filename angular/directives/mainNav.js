app.directive('mainNav', function() {
    return {
        restrict     : "E", // restrict element
        templateUrl  : "templates/mainNavTemplate.html",
        scope        : {},
        controller   : 'userDetailsController',
        controllerAs : 'user'
        }
});