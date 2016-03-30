(function() {
	'use strict';
	angular.module('auth').provider('navConfigProvider', navConfigProvider);
	function navConfigProvider() {
		this.$get = function() {
			return this;
		};
		this.config = [
						{
							'pageId': '1',
							'pageDisplayName': '数据报告',
							'requiredPermits': ['21'],
							'hasChildren': true,
							'hasIcon': true,
							'iconClass': 'new-icon-report',
							'children': [
								{
									'pageId': '1.1',
									'pageDisplayName': '数据概览',
									'href': '/#/data?reportId=1',
									'requiredPermits': []			
								},
								{
									'pageId': '1.2',
									'pageDisplayName': '产品线数据',
									'hasChildren': true,
									'children': [
										{
											'pageId': '1.2.1',
											'href': '/#/data?reportId=2',
											'pageDisplayName': '出租车'
										}, {
											'pageId': '1.2.2',
											'href': '/#/data?reportId=3',
											'pageDisplayName': '专车'
										}
									]
								}
							]
						}, 
						{
							'pageId': '2',
							'pageDisplayName': '问题追踪',
							'requiredPermits': ['22'],
							'hasIcon': true,
							'iconClass': 'new-icon-track',
							'hasChildren': true,
							'children': [
								{
									'pageId': '1.1',
									'pageDisplayName': '问题列表',
									'requiredPermits': []			
								}
							]
						},
						{
							'pageId': 'customer-feedback',
							'pageDisplayName': '用户反馈',
							'requiredPermits': ['23'],
							'hasIcon': true,
							'iconClass': 'new-icon-track',
							'hasChildren': false
						}
					];
	}
})();