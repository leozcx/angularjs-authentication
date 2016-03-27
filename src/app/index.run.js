(function() {
  'use strict';

  angular
    .module('auth')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, Authentication) {
    Authentication.requestUser();
    $log.debug('runBlock end');
  }

})();
