app.controller('loginController', ['dataService', '$location', '$localStorage', '$rootScope', function(dataService, $location, $localStorage, $rootScope) {
    var main = this;
    this.userLogin = function() { 
        data = {
            email: main.email,
            password: main.password
        };
        dataService.login(data)
            .then(function success(response) {
                console.log(response);
                if (!response.data.error) {
                    console.log(response.data.message);
                    //storing auth-token using local storage
                    $localStorage.token = response.data.data['auth-token'];
                    $location.path('/');
                } else {
                    alert("Email id or password entered is incorrect!");
                }
            }, function error(response) {
                alert("some error occured, check the console.");
                console.log(response);
            });
    };

}]);