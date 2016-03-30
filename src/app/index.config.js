(function() {
  'use strict';

  angular
    .module('auth')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $translateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    
    $translateProvider.translations('zh', {
        'TITLE': '用户体验平台',
        'DATA_REPORT': '数据报告',
        'DATA_OVERVIEW': '数据概览',
        'BUSINESS_LINE': '产品线数据',
        'TAXI': '出租车',
        'SPECIAL_CAR': '专车',
        'ISSUE_TRACKING': '问题追踪',
        'ISSUE_LIST': '问题列表',
        'USER_FEEDBACK': '用户反馈',
        'FOO': 'This is a paragraph'
      });
     
      $translateProvider.preferredLanguage('zh');
  }

})();
