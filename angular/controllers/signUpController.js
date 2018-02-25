app.controller('signUpController', ['dataService', '$location', function(dataService, $location) {
	var main = this;
	this.userSignUp = function() {
		data = {
			firstName    : main.firstName,
			lastName     : main.lastName,
			middleName   : main.middleName,
			email 	     : main.email,
			address      : main.address,
			mobileNumber : main.mobileNumber + "",
			password     : main.password
		};
		dataService.signUp(data)
		.then(function success(response) {
			console.log(response);
			if(!response.data.error){
				$location.path('/loginForm');
			}
			else{
				alert(response.data.message);
			}
		}, function error(response) {
			console.log(response);
		});
	};
}]);