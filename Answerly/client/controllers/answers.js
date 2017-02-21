var myApp = angular.module('myApp');

myApp.controller('AnswersController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('AnswersController loaded...');

	$scope.getAnswers = function(){
		$http.get('/api/questions').success(function(response){
			$scope.answers = response;
		});
	}

	$scope.addAnswers = function(){
		
		$http.post('/api/questions/', $scope.answers).success(function(response){
			window.location.href='#/questions';
		});
	}

}]);