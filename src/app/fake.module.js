var myAppDev = angular.module('myAppDev', [ 'auth', 'ngMockE2E' ]);
myAppDev.run(function($httpBackend, GET_LIST_URL, $http) {
	$httpBackend.whenGET(GET_LIST_URL).passThrough();
	$httpBackend.whenGET(/app\//).passThrough();
	$httpBackend.whenGET(/api\//).passThrough();
});