angular.module('wordpress.controllers', [])

.controller('wordpressCtrl', function($rootScope) {
  $rootScope.url = 'http://quotesondesign.com/wp-json/'; //For iOS native this should use SSL
})

.controller('PostCtrl', function($scope, $stateParams, PostsLoader, $ionicLoading, $rootScope, $sce, CacheFactory, $timeout ) {

  if (!CacheFactory.get('doPostCaching')) {
    CacheFactory.createCache('doPostCaching');
  }

  var doPostCaching = CacheFactory.get('doPostCaching');
  var posturl = $rootScope.url + 'posts/' + $scope.indPostId;
  $scope.indPostId = $stateParams.postId;

  $scope.loadPost = function() { //Start loading post
    $ionicLoading.show();
    PostsLoader.get( posturl ).then(function(response) {
      $scope.post = response.data;
      $scope.content = $sce.trustAsHtml(response.data.content);
      doPostCaching.put(response.data.ID, response.data);

      $ionicLoading.hide();
	}, 
	function(response) {
		  $log.error('error >>>>>>>', response);
		  $ionicLoading.hide();
	});

  }//End loading post

  if(!doPostCaching.get($scope.indPostId)) {
    $scope.loadPost();
  }else{
    $scope.post = doPostCaching.get($scope.indPostId);
    $scope.content = $sce.trustAsHtml($scope.post.content);
  } 
  
})

.controller('PostsCtrl', function( $scope, $http, PostsLoader, $rootScope, $ionicLoading ) {

  var posturl = $rootScope.url + 'posts';

  $scope.loadPosts = function() {
	$ionicLoading.show();
    PostsLoader.get(posturl).then(function(response) {
		
      $scope.posts = response.data;
	  $scope.morePosts = true;
		$ionicLoading.hide();
    }, 
	function(response) {
      $ionicLoading.hide();
    });
  }

  $scope.loadPosts(); //Load post on loaded
});





