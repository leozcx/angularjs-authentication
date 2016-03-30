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
							'pageDisplayName_key': 'DATA_REPORT',
							'requiredPermits': ['21'],
							'hasChildren': true,
							'hasIcon': true,
							'iconClass': 'new-icon new-icon-report',
							'children': [
								{
									'pageId': '1.1',
									'pageDisplayName_key': 'DATA_OVERVIEW',
									'href': '/#/data?reportId=1',
									'requiredPermits': []			
								},
								{
									'pageId': '1.2',
									'pageDisplayName_key': 'BUSINESS_LINE',
									'hasChildren': true,
									'children': [
										{
											'pageId': '1.2.1',
											'href': '/#/data?reportId=2',
											'pageDisplayName_key': 'TAXI'
										}, {
											'pageId': '1.2.2',
											'href': '/#/data?reportId=3',
											'pageDisplayName_key': 'SPECIAL_CAR'
										}
									]
								}
							]
						}, 
						{
							'pageId': '2',
							'pageDisplayName_key': 'ISSUE_TRACKING',
							'requiredPermits': ['22'],
							'hasIcon': true,
							'iconClass': 'new-icon new-icon-track',
							'hasChildren': true,
							'children': [
								{
									'pageId': '2.1',
									'pageDisplayName_key': 'ISSUE_LIST',
									'requiredPermits': []			
								}
							]
						},
						{
							'pageId': 'customer-feedback',
							'pageDisplayName_key': 'USER_FEEDBACK',
							'requiredPermits': ['23'],
							'hasIcon': true,
							'iconClass': 'new-icon new-icon-track',
							'hasChildren': false
						}
					];
	}
})();