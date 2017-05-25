var app = angular.module('course-detail',["chart.js"]);



app.controller('course-detail', function ($scope,$http,$timeout,$window,$rootScope) {
    
    var urlParam = function(name, w){
	    w = w || window;
	    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
	        val = w.location.search.match(rx);
	    return !val ? '':val[1];
	  }

    var classNum = urlParam('num');
    var quarter = decodeURI(urlParam('term'));

    // $scope.colours = ['#803690', '#00ADF9', '#f9777a', '#6ccccb', '#FDB45C', '#949FB1', '#4D5360', '#cd97bb', '#cda997', '#7c75fd', '#c0dcfe'];

    $scope.chartInit = function(){

        var config = {
          params: {
              courseNum: classNum,
              courseQuarter: quarter,
          }
        }

        $http.get('/chart', config).then(function successCallback(response) {
               
               $scope.revLabels = [];
               $scope.revLabels.push("Reviews"); 
               $scope.revLabels.push("No Reviews"); 

               $scope.revData = [];
               $scope.revData.push(response.data[0][0].Not_Empty);
               $scope.revData.push(response.data[0][0].Empty);

               //difficulty
               var diff = response.data[1];      
               $scope.diffLabels = [];
               $scope.diffData = [];

               diff.forEach(function(ele){
                  if (ele.rDifficulty != 0){
                    $scope.diffLabels.push(ele.rDifficulty.toFixed(2));
                    $scope.diffData.push(ele.count);
                  }
               });

               //effitiveness
               var eff = response.data[2];
               $scope.effLabels = [];
               $scope.effData = [];

               eff.forEach(function(ele){
                  if (ele.rEffectiveness != 0){
                    $scope.effLabels.push(ele.rEffectiveness.toFixed(2));
                    $scope.effData.push(ele.count);
                  }
               });

               //overall
               var over = response.data[3];
               $scope.overallLabels = [];
               $scope.overallData = [];

               over.forEach(function(ele){
                  if (ele.rating != 0){
                    $scope.overallLabels.push(ele.rating.toFixed(2));
                    $scope.overallData.push(ele.count);
                  }
               });

               var ctec = response.data[4];
               $scope.overallLabels.push("(CTEC) ," + ctec[0].rating.toFixed(2));
               $scope.overallData.push(ctec[0].no_of_students);          

        }, function errorCallback(response){
               swal({
                    title: 'Error!',
                    text: 'Log out Error!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake',
              })
        });
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
              })
        });
    }

    $scope.courseDetail = function(){
    	
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

               if (response.data[1] == "No one rated"){
                  response.data[1] = "";
               }

               $scope.self = response.data[0]
               $scope.raters = response.data[1];

               // console.log($scope.self, $scope.raters);
        
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

    $scope.getTargetNetID = function(rater){

        // console.log(rater);
        var name = rater.first_name;
        var netid = rater.netid;

        swal({
          title: 'Message to ' + name,
          input: 'textarea',
          showCancelButton: true,
          confirmButtonColor: '#5F9F9D',
          cancelButtonColor: '#ba8d8e',
          confirmButtonText: 'Message',
          allowOutsideClick : false
        }).then(function (text) {
          if (text) {
            $window.sessionStorage.setItem('target', angular.toJson(netid, false));
            $window.sessionStorage.setItem('message', angular.toJson(text, false));
            // console.log($rootScope.target, $rootScope.message);
            $window.location.href = "home.html";
          }
          else{
            swal({
              title: 'No words?',
              confirmButtonText: 'cancel message',
              confirmButtonColor: '#ba8d8e',
              allowOutsideClick : false,
            })
          }
        }, function (dismiss) {
          // dismiss can be 'cancel', 'overlay',
          // 'close', and 'timer'
          if (dismiss === 'cancel') {
            swal({
              title: 'Cancelled',
              confirmButtonColor: '#ba8d8e',
              type: 'error',
              allowOutsideClick : false,
            })
          }
        })
        
    }


	
});