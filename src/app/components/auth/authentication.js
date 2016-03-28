(function(){
  angular.module('auth')
  .service('Authentication', ['$q', '$http', 'GET_LIST_URL', function($q, $http, GET_LIST_URL) {
    var user = null;
    return {
      requestUser: function() {
      var deferred = $q.defer();
      $http.get(GET_LIST_URL).success(function(data) {
        user = data;
        console.log(user)
        deferred.resolve(data);
      }).error(function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
      },
      getUser: function() {
        return user;
      },

      exists: function() {
        return user != null;
      }
    };
  }])
})();
