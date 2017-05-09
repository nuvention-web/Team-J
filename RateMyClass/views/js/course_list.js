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

    $scope.getDetails = function(detail){
    	$scope.selectedCourse = detail;

    	$("#courseDetail").modal('show');
    	$scope.changeClass(detail.rating);
    	$scope.load_rater($scope.selectedCourse);
    }


    $scope.load_rater = function(sC){

        var config = {
    		params: {
       		 	courseNum: sC.class_num,
       		 	courseQuarter: sC.term,
    		}
		}

		// console.log(config);

        console.log(selectedQuarter);
        $http.get('/raterlist', config).then(function successCallback(response) {
               $scope.raters = response.data;
               console.log($scope.raters);
        }, function errorCallback(response){
               console.log("Error");
        });
    }


    $scope.changeClass = function(rates){
    	// console.log(rates);

    	if (rates <= 2.0)
    		$scope.rateClass = "label label-danger";
    	else if (rates < 3.5 && rates > 2.0)
    		$scope.rateClass = "label label-warning";
    	else if (rates <= 5.0 && rates >= 3.5)
    		$scope.rateClass = "label label-success";
    	else
    		$scope.rateClass = "label label-default";

    }


    


    
});