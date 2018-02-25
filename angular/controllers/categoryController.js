app.controller('categoryController', ['dataService', '$routeParams', '$location', '$localStorage', '$route',  '$rootScope', function(dataService, $routeParams, $location, $localStorage, $route, $rootScope) {
    var main = this;
    this.IsVisible = [];
    $rootScope.loggedIn = false;
    this.ShowHide = function(index) {
        //If DIV is visible it will be hidden and vice versa.
        main.IsVisible[index] = main.IsVisible[index] ? false : true;
    };
    var categoryType = $routeParams.categoryType;

    this.getAllCategories = function() { 
        dataService.getAllProdCategs()
            .then(function success(response) {
                main.data = response.data.data;
                console.log(response);
            }, function error(response) {
                console.log(response);
            });
    }();

    this.viewProductByC = function() {
        dataService.viewProdByC(categoryType)
            .then(function success(response) {
                main.prodCategory = response.data.data;
                for(var i in main.prodCategory) {
                    //minimum quantity of each product to be 1
                    main.prodCategory[i].quantity = 1; 
                }
                console.log(response);
            }, function error(response) {
                console.log(response);
            });
    }();

    //increments quantity of product whenever user clicks on the '+' button
    this.increment = function(pid) { 
        for(var prod in main.prodCategory) {
            if(main.prodCategory[prod].productId == pid) {
                main.prodCategory[prod].quantity++;
            }
        }
    }; 

    //decrements quantity of product whenever user clicks on the '-' button   
    this.decrement = function(pid) {
        for(var prod in main.prodCategory) {
            if(main.prodCategory[prod].productId == pid) {
                var quant = (main.prodCategory[prod].quantity - 1);
                main.prodCategory[prod].quantity = (quant < 1) ? 1 : quant;
            }
        } 
    };

    this.placeOrder = function(productId, quantity) {
        if ($rootScope.loggedIn) {
            const data = {
                authToken: $localStorage.token,
                productId: productId,
                quantity: quantity
            };
            dataService.placeOrder(data)
                .then(function success(response) {
                    alert('Order placed successfully');
                    dataService.getData(response.data.data);
                    $location.path('/myOrders');
                    console.log(response);
                }, function error(response) {
                    console.log(response);
                });
        } else {
            alert("You must login to proceed!");
        }
    };

    this.addItemToCart = function(productId, quantity) {
        if ($rootScope.loggedIn) {
            const data = {
                productId: productId,
                quantity: quantity,
                authToken: $localStorage.token
            };
            dataService.addItem(data)
                .then(function success(response) {
                    main.cartQuant = response.data.data;
                    $route.reload();
                    console.log(main.cartQuant);
                }).catch(function error(response) {
                    console.log(response);
                });
        } else {
            alert("You must login to proceed!");
        }
    };
}]);