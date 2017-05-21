var app = angular.module('course-list',[]);

app.controller('course-list', function ($scope,$http,$timeout,$window,$location) {	

	var selectedQuarter = "2017 Fall";
    var userid = $location.search()['id']
	
	$scope.logOut = function(){
      $http.get('/logout').then(function successCallback(response) {
               console.log("Log Out");
               $window.location.href = "chat_login.html";
        }, function errorCallback(response){
               swal({
                    title: 'Error!',
                    text: 'Log out Error!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake',
                    timer: 4000
              })
        });
    }
    

	$scope.getQuarter = function(quarter){
    	selectedQuarter = quarter;
    	$scope.load_course(selectedQuarter);
	}

    $scope.load_course = function(selectedQuarter){

        console.log("user id is ", $window.location.hash.substring(2,));

        if (selectedQuarter == null)
        	selectedQuarter = "2017 Fall";
        var config = {
    		params: {
       		 	term: selectedQuarter
    		}
		}

        $http.get('/courselist', config).then(function successCallback(response) {
               $scope.courses = response.data;
        }, function errorCallback(response){
               swal({
                    title: 'Error!',
                    text: 'Connection Error!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake',
                    timer: 4000
              })
        });
    }

    $scope.load_search = function(){

        var searched = localStorage.getItem("searchedCourse");
        $scope.searchCourse = searched;
        localStorage.setItem('searchedCourse', "");
    }

    $scope.getDetails = function(detail){
    	
        $scope.selectedCourse = detail;

        $window.location.href = "course_detail.html?num=" + detail.class_num + "&term="+ detail.term;
    	// $("#courseDetail").modal('show');
    	// $scope.changeClass(detail.rating);
    	// $scope.load_rater($scope.selectedCourse);
    }


  //   $scope.load_rater = function(sC){

  //       var config = {
  //   		params: {
  //      		 	courseNum: sC.class_num,
  //      		 	courseQuarter: sC.term,
  //   		}
		// }
  //       // console.log(config);
  //       $http.get('/raterlist', config).then(function successCallback(response) {

  //              $scope.raters = response.data;
  //              // console.log($scope.raters);
  //       }, function errorCallback(response){
  //              swal({
  //                   title: 'Error!',
  //                   text: 'Connection Error!',
  //                   type: 'error',
  //                   allowOutsideClick : false,
  //                   animation: false,
  //                   customClass: 'animated shake',
  //                   timer: 4000
  //             })
  //       });
  //   }


    $scope.rateClass = function(rates){

    	if (rates <= 2.0)
    		$scope.rateClass = "label label-danger";
    	else if (rates < 3.5 && rates > 2.0)
    		$scope.rateClass = "label label-warning";
    	else if (rates <= 5.0 && rates >= 3.5)
    		$scope.rateClass = "label label-success";
    	else
    		$scope.rateClass = "label label-default";
    }

    // $scope.getTargetNetID = function(target){
        

    //     sessionStorage.target = JSON.stringify(target.netid);
    //     $window.location.href = "home.html";
    // }


    


    
});