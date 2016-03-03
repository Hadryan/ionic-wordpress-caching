angular.module('wordpress.services', [])

.factory('PostsLoader', function($http) {

  return {
    get: function(url) {

	  console.log(">>>>> " + url);
      return $http.get( url );
    }
  }

});
