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

var str = "";

function submitAnswer(){

	str = document.getElementById("inputAnswer").value;

	if (str == ""){
	// 	// alert("NO Empty Answers!");
		// $('#myModalHorizontal').modal('hide');
		$('#EmptyInput').modal('show');
		// $('#myModalHorizontal').modal('show');
	// 	// $('#myModalHorizontal').modal('show');
	// 	// var modal = document.getElementById("EmptyInput");
	// 	// console.log("modal", modal);
	// 	// modal.aria-hidden = 'false';
	}

	else
		$('#myModalHorizontal').modal('hide');

	

	console.log("str", str);
}
