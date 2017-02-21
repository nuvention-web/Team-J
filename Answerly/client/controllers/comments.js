var myApp = angular.module('myApp');

myApp.controller('AnswersController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('AnswersController loaded...');

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