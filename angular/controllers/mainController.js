app.controller('mainController', ['dataService', '$location', '$localStorage', '$rootScope', '$route', function(dataService, $location, $localStorage, $rootScope, $route) {
    var main = this;
    this.IsVisible = [];
    this.ShowHide = function(index) {
        //If DIV is visible it will be hidden and vice versa.
        main.IsVisible[index] = main.IsVisible[index] ? false : true;
    };

    this.viewAllProducts = function() {
        dataService.viewAllProds()
            .then(function success(response) {
                main.entireData = response.data.data;
                for (var i in main.entireData) {
                    main.entireData[i].quantity = 1;
                }
                console.log(response);
            }, function error(response) {
                console.log(response);
            });
    }();

    this.increment = function(pid) {
        for (var prod in main.entireData) {
            if (main.entireData[prod].productId == pid) {
                main.entireData[prod].quantity++;
            }
        }
    };

    this.decrement = function(pid) {
        for (var prod in main.entireData) {
            if (main.entireData[prod].productId == pid) {
                var quant = (main.entireData[prod].quantity - 1);
                main.entireData[prod].quantity = (quant < 1) ? 1 : quant;
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