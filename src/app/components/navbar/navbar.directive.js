(function() {
	'use strict';

	angular.module('auth').directive('acmeNavbar', ['$http', 'GET_USER_PERMITS', 'METHOD', acmeNavbar]);
	
	/** @ngInject */
	function acmeNavbar($http, GET_USER_PERMITS, METHOD) {
		var directive = {
			restrict : 'E',
			templateUrl : 'app/components/navbar/navbar.html',
			controllerAs : 'vm',
			bindToController : true,
			controller : function(navConfigProvider, $http) {
				var vm = this;
				vm.selectedPage = navConfigProvider.config[0].pageId;
				vm.data = navConfigProvider.config;
				vm.hasPermit = function(pageItem) {
					if(!vm.permits)
						return false;
					var result = true;
					if(pageItem.requiredPermits) {
						pageItem.requiredPermits.forEach(function(permit) {
							console.log(vm.permits[permit])
							result = result && vm.permits[permit];
						});
					}
					return result;
				};
				
				vm.onClick = function(item) {
					vm.selectedPage = item.pageId;
					console.log(item.pageId)
				};
				
				$http({
					url: GET_USER_PERMITS,
					method: METHOD
				}).then(function(resp) {
					console.log(resp);
					vm.permits = resp.data;
				}, function(error) {
					console.log(error);
				});
			}
		};

		return directive;
	}

	var $ = angular.element;
	(function() {
		$('#js-header').on('mouseenter', '.js-header-dropmenu', function() {
			$(this).find('.js-header-list').slideDown('fast');
		}).on('mouseleave', '.js-header-dropmenu', function() {
			$(this).find('.js-header-list').slideUp('fast');
		})
	})();

	// 左侧梳妆菜单展开收起效果
	(function() {
		$(document)
				.on(
						'click',
						'#js-aside .mala-subnavi-lead',
						function() {
							var target = $(this), arrow = target
									.find('.mala-arrow'), is_up = arrow
									.hasClass('mala-arrow-up'), list = target
									.siblings('.mala-thirdnavi-list');
							console.log(is_up)
							if (is_up) {
								arrow.removeClass('mala-arrow-up').addClass(
										'mala-arrow-down');
								list.slideUp();
							} else {
								arrow.removeClass('mala-arrow-down').addClass(
										'mala-arrow-up');
								list.slideDown();
							}
						});
	})();

})();
