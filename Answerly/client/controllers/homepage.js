var myApp = angular.module('myApp');

myApp.controller('HomeController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('HomeController loaded...');

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

	$scope.getQuestions = function(){
		$http.get('/api/questions').success(function(response){
			$scope.questions = response;
		});
	}

	$scope.addQuestion = function(){
		
		$http.post('/api/questions/', $scope.question).success(function(response){
			window.location.href='#/questions';
		});
	}

}]);