$("#searchButton").click(function(){
  searched = $('#searchCourse').val();
  localStorage.setItem('searchedCourse', searched);
  window.location.href = "course_list.html";
});

$("#searchCourse").keypress(function(e) {
    if(e.which == 13) {
        searched = $('#searchCourse').val();
        localStorage.setItem('searchedCourse', searched);
        window.location.href = "course_list.html";
    }
});

function call_home(){
	go_home();
}

// var app = angular.module('main',[]).run(function($rootScope) {
//     $rootScope.uid = "abc";
// })

// app.controller('main', function ($scope,$http,$timeout,$window,$rootScope) {

// 	go_home=function(){
// 		$http.get('/home').then(function successCallback(response) {
// 	               console.log("got from home");
// 	               console.log($rootScope.uid);
// 	        }, function errorCallback(response){
// 	               console.log("Error");
// 	        });
// 	}
// });