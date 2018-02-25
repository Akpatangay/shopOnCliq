app.service('dataService', function($http) {
	var main = this;
	this.url = 'https://ecommerceapi.edwisor.com/api/v1/';

//////////////////CART SECTION//////////////////////////// 

	this.addItem = function(data) { 
		return $http({
			method : 'POST',
			url    : main.url + 'cart/add',
			params : data
		})
	}
	this.clearCart = function(data) {
		return $http({
			method : 'GET',
			url    : main.url + 'cart/clear',
			params   : data
		})
	}
	this.removeItem = function(data) {
		return $http({
			method : 'POST',
			url    : main.url + 'cart/remove',
			params : data
		})
	}
	this.reduceItem = function(data) {
		return $http({
			method : 'POST',
			url    : main.url + 'cart/reduceItem',
			params : data
		})
	}
	this.viewCart = function(data) { 
		console.log(data);
		return $http({
			method : 'GET',
			url    : main.url + 'cart/view',
			params : data
		})
	}
	//storing order details once the order is placed
	this.getData = function(data) {
		main.datafromCart = data
	}

//////////////////ORDER SECTION//////////////////////////// 

	this.placeFromCart = function(data) {
		return $http({
			method   : 'POST',
			url      : main.url + 'order/fromCart',
			params   : data
		})
	}
	this.placeOrder = function(data) {
		return $http({
			method   : 'POST',
			url      : main.url + 'order/create',
			params   : data
		})
	}
	//data to be retrieved when order is placed
	this.retrieveData = function() {
		return main.datafromCart;
	}

//////////////////PRODUCT SECTION////////////////////////////

	this.getAllProdCategs = function() {
		return $http({
			method : 'GET',
			url    : main.url + 'product/view/getallcategory'
		})
	} 
	this.viewAllProds = function() {
		return $http({
			method : 'GET',
			url    : main.url + 'product/view/all'
		})
	}
	this.viewProdByC = function(categoryType) {
		return $http({
			method : 'GET',
			url    : main.url + 'product/view?category=' + categoryType
		})
	}	

//////////////////USER SECTION////////////////////////////

	this.changePass = function(data) {
		return $http({
			method : 'POST',
			url    : main.url + 'user/changepassword',
			params : data
		})
	}	
	this.login = function(data) {
		return $http({
			method : 'POST',
			url    : main.url + 'user/login',
			params : data
		})
	}
	this.logout = function(data) {
		return $http({
			method : 'POST',
			url    : main.url + 'user/logout',
			params : data
		})
	}
	this.accDetails = function(data) {
		return $http({
			method : 'GET',
			url    : main.url + 'user/myaccount',
			params : data
		})
	}
	this.signUp = function(data) {
		return $http({
			method : 'POST',
			url    : main.url + 'user/signup',
			params : data
		})
	}
});