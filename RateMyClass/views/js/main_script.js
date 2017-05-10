var app=angular.module('main',[]);

app.controller('main-control', function ($scope,$http,$timeout,$window) {	

    $scope.go_to_chat = function(){
    	// $window.location.href = "/home";
        // var term = "2016 Fall";
        $http.get('/home').then(function successCallback(response) {
               console.log("home success");
        }, function errorCallback(response){
               console.log("Error");
        });
     }
    
});