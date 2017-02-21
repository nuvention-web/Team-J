var myApp = angular.module('myApp');

myApp.controller('CommentsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('CommentsController loaded...');

	$scope.getComments = function(){
		$http.get('/api/questions').success(function(response){
			$scope.comments = response;
		});
	}

	$scope.addComments = function(){
		$http.post('/api/questions/', $scope.comments).success(function(response){
			window.location.href='#/questions';
		});
	}

}]);