var myApp = angular.module('myApp',[]);

myApp.controller('HomeController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('HomeController loaded...');

	// $scope.getAnswers = function(){
	// 	$http.get('/api/answers').success(function(response){
	// 		$scope.answers = response;
	// 		console.log(response);
	// 	});
	// }

	// $scope.addAnswers = function(){
		
	// 	$http.post('/api/answers/', $scope.answers).success(function(response){
	// 		window.location.href='#/questions';
	// 	});
	// }

	// $scope.getQuestions = function(){
	// 	$http.get('/api/questions').success(function(response){
	// 		$scope.questions = response;
	// 	});
	// }

	// $scope.addQuestion = function(){
		
	// 	$http.post('/api/questions/', $scope.question).success(function(response){
	// 		window.location.href='#/questions';
	// 	});
	// }

}]);

var ClickFlag = false;
function ShowMenu(){

	ClickFlag ^= 1;
	console.log(ClickFlag);
	if (ClickFlag)
		document.getElementById("nav-dropdown").style.visibility = "visible";
	else
		document.getElementById("nav-dropdown").style.visibility = "hidden";
	
}

// var y = document.getElementsByName("star");

// function rateValue(){

// 	var x = document.getElementsByName("star");
// 	console.log(x, y);
// }