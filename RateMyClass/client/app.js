var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'HomeController',
		templateUrl: 'views/main.html'
	})

	.when('/login', {
		controller:'HomeController',
		templateUrl: 'views/login.html'
	})

	.when('/questions', {
		controller:'HomeController',
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