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

var AnswertoQuestion = "";

function submitAnswer(){

	// localStorage.getItem("indexQuestion");
	// var GetTempName = "ModalID" + indexQuestion;

	AnswertoQuestion = document.getElementById("inputAnswer").value;
	console.log("AnswertoQuestion", AnswertoQuestion);

	if (AnswertoQuestion == ""){
	// 	// alert("NO Empty Answers!");
		// $('#myModalHorizontal').modal('hide');
		localStorage.getItem("indexQuestion");
		// console.log("indexQuestion", indexQuestion);
		var TempName = "#warningModal" + indexQuestion;


		$(TempName).modal('show');
		// $('#myModalHorizontal').modal('show');
	// 	// $('#myModalHorizontal').modal('show');
	// 	// var modal = document.getElementById("EmptyInput");
	// 	// console.log("modal", modal);
	// 	// modal.aria-hidden = 'false';
	}

	else{
		localStorage.getItem("indexQuestion");
		// console.log("indexQuestion", indexQuestion);
		var TempName = "#ModalID" + indexQuestion;
		$(TempName).modal('hide');
	}

	
}
