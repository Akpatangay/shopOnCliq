app.directive('loginDirective', function() { //directive to view the admin pages when logged in
	return {
		restrict   : 'E',
		templateUrl: 'templates/loginTemplate.html'
	};
});