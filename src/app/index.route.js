(function() {
  'use strict';

  angular
    .module('auth')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/data', {
    	  templateUrl: 'app/data-overview/overview.html',
    	  controller: 'DataOverviewController',
    	  controllerAs: 'dataOverview'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
