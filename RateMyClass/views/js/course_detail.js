var app = angular.module('course-detail',[]);

app.controller('course-detail', function ($scope,$http,$timeout,$window,$rootScope) {
    
    var urlParam = function(name, w){
	    w = w || window;
	    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
	        val = w.location.search.match(rx);
	    return !val ? '':val[1];
	  }

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

    $scope.courseDetail = function(){
    	var classNum = urlParam('num');
    	var quarter = decodeURI(urlParam('term'));

    	var config = {
    		params: {
       		 	courseNum: classNum,
       		 	courseQuarter: quarter,
    		}
		  }

    	$http.get('/courseDetail', config).then(function successCallback(response) {
               $scope.course = response.data[0];
               // console.log(response.data);
               if (response.data == "No course found"){
                  swal({
                    title: 'Warning!',
                    text: 'Might be a database error, please try again!',
                    type: 'warning',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake',
                  })
               }

               if (response.data == "Not login"){
                  swal({
                    title: 'Warning!',
                    text: 'Please Log in!',
                    type: 'warning',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake',
                  }).then(function(){
                    $scope.logOut();
                  })               
               }

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
    	// console.log(classNum, quarter);
    }

    $scope.raterList = function(){
      var classNum = urlParam('num');
      var quarter = decodeURI(urlParam('term'));

      var config = {
        params: {
            courseNum: classNum,
            courseQuarter: quarter,
        }
      }

      $http.get('/raterlist', config).then(function successCallback(response) {

               if (response.data == "No one rated"){
                  response.data = "";
               }
               $scope.raters = response.data;
        
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

    $scope.getTargetNetID = function(netid){
        // sessionStorage.target = JSON.stringify(netid);
        $rootScope.target = netid;
        $window.location.href = "home.html";
    }


	
});