(function() {
	'use strict';
	angular.module('auth')
	.controller('DataOverviewController', ['$http', 'GET_LIST_URL', 'METHOD', function($http, GET_LIST_URL, METHOD) {
		$http({
			url: GET_LIST_URL,
			method: METHOD
		}).then(function(resp) {
			console.log(resp)
		}, function(error) {
			console.log(error)
		});
	}]);
})(); 