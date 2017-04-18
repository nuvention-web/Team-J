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

	.when('/course_list', {
		controller:'HomeController',
		templateUrl: 'views/course_list.html'
	})

	.when('/profile', {
		controller:'HomeController',
		templateUrl: 'views/profile.html'
	})

	.when('/chatbot', {
		controller:'HomeController',
		templateUrl: 'views/chat_login.html'
	})

	// .when('/questions', {
	// 	controller:'HomeController',
	// 	templateUrl: 'views/questions.html'
	// })
	
	// .when('/questions/add',{
	// 	controller:'CommentsController',
	// 	templateUrl: 'views/add_question.html'
	// })
	
	// .otherwise({
	// 	redirectTo: '/'
	// });
});