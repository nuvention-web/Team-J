var myApp = angular.module('myApp');

myApp.controller('QuestionsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('QuestionsController loaded...');

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