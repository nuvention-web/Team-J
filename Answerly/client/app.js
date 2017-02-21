var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'QuestionsController',
		templateUrl: 'views/questions.html'
	})
	.when('/questions', {
		controller:'QuestionsController',
		templateUrl: 'views/questions.html'
	})
	
	.when('/questions/add',{
		controller:'CommentsController',
		templateUrl: 'views/add_question.html'
	})
	
	.otherwise({
		redirectTo: '/'
	});
});