(function(){
  angular.module('auth')
  .service('Authentication', ['$q', '$http', function($q, $http) {
    var user = null;
    return {
      requestUser: function() {
      var deferred = $q.defer();
      $http.get('api/user.json').success(function(data) {
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
