app.controller('orderController', ['dataService', '$localStorage', '$location', function(dataService, $localStorage, $location) {
	var main = this;
	this.allOrderDetails = function() { 
		//retrieving data from the service that stores from the response on adding product to cart
		main.orderData = dataService.retrieveData();
		main.userInfo = main.orderData.userInfo;
		main.orderDetails = main.orderData.orderDetails;
		main.productData = main.orderData.productData;
	}();
}]);