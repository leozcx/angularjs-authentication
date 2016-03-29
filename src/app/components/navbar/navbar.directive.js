(function() {
	'use strict';

	angular.module('auth').directive('acmeNavbar', acmeNavbar);

	/** @ngInject */
	function acmeNavbar() {
		var directive = {
			restrict : 'E',
			templateUrl : 'app/components/navbar/navbar.html',
			controller : NavbarController,
			controllerAs : 'vm',
			bindToController : true
		};

		return directive;

		/** @ngInject */
		function NavbarController() {
			var vm = this;
			
			vm.overview = {'reportId': '1', 'name': "数据概览"};

			vm.businesses = [ {
				'reportId' : '2',
				'name' : "出租车"
			}, {
				'reportId' : '3',
				'name' : "快车"
			} ];
			
			vm.showReport = function(business) {
				console.log(business)
			}
		}
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
							console.log('clicked')
							var target = $(this), arrow = target
									.find('.mala-arrow'), is_up = arrow
									.hasClass('mala-arrow-up'), list = target
									.siblings('.mala-thirdnavi-list');
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
