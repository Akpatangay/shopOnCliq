app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/mainView.html',
            controller  : 'mainController',
            controllerAs: 'main'
        })
        .when('/category/:categoryType', {
            templateUrl : 'views/prodByCategoryView.html',
            controller  : 'categoryController',
            controllerAs: 'category'
        })
        .when('/loginForm', {
            templateUrl : 'views/loginView.html',
            controller  : 'loginController',
            controllerAs: 'log'
        })
        .when('/signUpForm', {
            templateUrl : 'views/signUpView.html',
            controller  : 'signUpController',
            controllerAs: 'signUp'
        })
        .when('/details', {
            templateUrl : 'views/userDetailsView.html',
            controller  : 'userDetailsController',
            controllerAs: 'user'
        })
        .when('/myCart', {
            templateUrl : 'views/cartView.html',
            controller  : 'cartController',
            controllerAs: 'cart'
        })
        .when('/myOrders', {
            templateUrl : 'views/orderView.html',
            controller  : 'orderController',
            controllerAs: 'order'
        })
        .otherwise(
            {
                redirectTo:'/'
        });
}]);