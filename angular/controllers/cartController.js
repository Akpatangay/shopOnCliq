app.controller('cartController', ['dataService', '$localStorage', '$route', '$location', '$rootScope', function(dataService, $localStorage, $route, $location, $rootScope) {
    $rootScope.loggedIn = true;
    var main = this;
    main.allData = {}; //to store the product id and their product details.
    main.cItems = []; //to store the objects of product IDs and their product details.
    this.viewAllProducts = function() {
        dataService.viewAllProds()
            .then(function success(response) {
                main.entireData = response.data.data;
                main.getData(main.entireData);
                console.log(main.entireData);
            }, function error(response) {
                console.log(response);
            });
    }();
    //fetching all the details for each product ID as a key value pair.
    this.getData = function(products) {
        for (var i in products) {
            main.allData[products[i].productId] = products[i];
        }
    };

    this.viewCart = function() {
        data = {
            authToken: $localStorage.token
        };
        dataService.viewCart(data)
            .then(function success(response) {
            	if(response.data.error) {
            		return;
            	}
                main.cartItems = response.data.data.cartInfo;
                console.log(main.cartItems);
                for (var j in main.cartItems) {
                    //fetching details of the products that are added to cart based on product ID
                    var item = main.allData[main.cartItems[j].productId];
                    //adding quantity and addedOn properties to the same item object obtained from cart response
                    item.quantity = main.cartItems[j].quantity;
                    item.addedOn = main.cartItems[j].addedOn;
                    main.cItems.push(item);
                    console.log(main.cItems);
                }
                console.log(main.allData);
            }, function error(response) {
                console.log(response);
            });
    }();

    this.clearCart = function() {
        if (main.cartItems.length) {
            data = {
                authToken: $localStorage.token
            };
            dataService.clearCart(data)
                .then(function success(response) {
                    console.log(response);
                    $route.reload();
                }, function error(response) {
                    console.log(response);
                });
        } else {
        	alert("Cart is empty");
        }
    };
    this.deleteFromCart = function(productId) {
        if (main.cartItems.length) {
            data = {
                authToken: $localStorage.token,
                productId: productId
            };
            dataService.removeItem(data)
                .then(function success(response) {
                    console.log(response);
                    $route.reload();
                }, function error(response) {
                    console.log(response);
                });
        } else {
        	alert("Cart is empty");
        }
    };
    this.reduceFromCart = function(productId, quantity) {
        data = {
            authToken: $localStorage.token,
            productId: productId,
            quantity: quantity
        };
        dataService.reduceItem(data)
            .then(function success(response) {
                if (!response.data.error) {
                    $route.reload();
                } else {
                    alert(response.data.message);
                }
                console.log(response);
            }, function error(response) {
                console.log(response);
            });
    };
    this.orderFromCart = function() {
        if (main.cartItems.length) {
            data = {
                authToken: $localStorage.token
            };
            dataService.placeFromCart(data)
                .then(function success(response) {
                    alert('Order placed successfully');
                    dataService.getData(response.data.data);
                    console.log(response.data.message);
                    $location.path('/myOrders');
                }, function error(response) {
                    console.log(response);
                });
        } else {
        	alert("No items to order!");
        }
    };
}]);