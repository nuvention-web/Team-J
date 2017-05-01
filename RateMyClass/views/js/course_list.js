var app = angular.module('course-list',[]);

app.controller('course-list', function ($scope,$http,$timeout,$window) {	

    $scope.load_course = function(){

        var data = "2016 Fall";
        $http.get('/courselist').then(function successCallback(response) {
               //$scope.courses = JSON.stringify(response.data);
               for (var i = 0; i < 2; i++){
               	alert(response.data);
               }
               console.log(response.data);
               // $scope.$apply();
        }, function errorCallback(response){
               console.log("error");
        });
    }
    
});