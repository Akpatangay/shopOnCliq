app.controller('userDetailsController', ['dataService', '$location', '$route', '$localStorage', '$rootScope', '$timeout', function(dataService, $location, $route, $localStorage, $rootScope, $timeout) {
    var main = this;
    main.cartTotal = 0; //stores the total quantity when user adds to the cart

    this.userDetails = function() { 
        data = {
            authToken: $localStorage.token
        };
        dataService.accDetails(data)
            .then(function success(response) {
                main.ifLoggedIn(response.data);
                main.allDetails = response.data.data;
                console.log(response.data.data);
            }, function error(response) {
                console.log(response);
            });
    }();

    //condition to allow users to proceed only when logged in
    this.ifLoggedIn = function(data) {
        if(!data.error) {
            $rootScope.loggedIn = true;
        } else {
            $rootScope.loggedIn = false;
        }
    }

    this.viewCart = function() { 
        data = {
            authToken : $localStorage.token
        };
        dataService.viewCart(data)
        .then(function success(response) {
            main.cartItems = response.data.data.cartInfo;
            console.log(main.cartItems);
            total(main.cartItems);
        }, function error(response) {
            console.log(response);
        });
    }();

    //adds up the quantities of different products the user wishes to add to cart
    var total = function(arr) { 
        for(var i in arr) {
            main.cartTotal += parseInt(arr[i].quantity);
        }
    };

    this.changePassword = function() { 
        data = {
            authToken  : $localStorage.token,
            oldPassword: main.oldPassword,
            newPassword: main.newPassword
        };
        dataService.changePass(data)
            .then(function success(response) {
                console.log(response); 
                if(!response.data.error){
                    alert("Password changed successfully");
                    $route.reload();
                    $location.path('/details');
                } else {
                    alert("Old password incorrect! Try again");
                }
            }, function error(response) {
                console.log(response);
            });
    };

    this.userLogOut = function() {
        data = { 
        	authToken: $localStorage.token 
        };
        dataService.logout(data)
            .then(function success(response) {
                console.log(response.data.message);
                $rootScope.loggedIn = false;
                alert("Thank you for visiting us. Happy shopping!");
                $location.path('/');
                $route.reload();
            }, function error(response) {
                console.log(response);
            });
    };
}]);