var app = angular.module('course-list',[]);

app.controller('course-list', function ($scope,$http,$timeout,$window) {	

	var selectedQuarter = "2017 Winter";
	

	$scope.getQuarter = function(quarter){
    	selectedQuarter = quarter;
    	console.log(selectedQuarter);
    	$scope.load_course(selectedQuarter);
	}

    $scope.load_course = function(selectedQuarter){

        // var term = "2016 Fall";
        if (selectedQuarter == null)
        	selectedQuarter = "2017 Winter";
        var config = {
    		params: {
       		 	term: selectedQuarter
    		}
		}

		// console.log(config);

        // console.log(selectedQuarter);
        $http.get('/courselist', config).then(function successCallback(response) {
               $scope.courses = response.data;
        }, function errorCallback(response){
               console.log("Error");
        });
    }

    $scope.load_search = function(){

        var searched = localStorage.getItem("searchedCourse");
        // console.log(searched);
        $scope.searchCourse = searched;
        localStorage.setItem('searchedCourse', "");
    }


    
});