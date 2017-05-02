var app = angular.module('course-list',[]);

app.controller('course-list', function ($scope,$http,$timeout,$window) {	

    $scope.load_course = function(){

        var term = "2016 Fall";
        $http.get('/courselist').then(function successCallback(response) {
               $scope.courses = response.data;
        }, function errorCallback(response){
               console.log("Error");
        });
    }
    
});