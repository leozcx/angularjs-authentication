/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('auth')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
