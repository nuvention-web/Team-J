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
               $scope.revData = [];

               // console.log(response.data[0]);

               if (response.data[0][0].Not_Empty == null && response.data[0][0].Empty == null){
                  document.getElementById("rev").style.display = "none";
                  document.getElementById("revTag").style.display = "block";
               }
               else{
                 $scope.revLabels.push("Reviews"); 
                 $scope.revLabels.push("No Reviews"); 
  
                 $scope.revData.push(response.data[0][0].Not_Empty);
                 $scope.revData.push(response.data[0][0].Empty);
               }

               //difficulty
               var diff = response.data[1];      
               $scope.diffLabels = [];
               $scope.diffData = [];

               if (diff != "None"){
                 for (var i=0, len = diff.length; i < len; i++){
                      $scope.diffLabels.push("Rate for " + diff[i].rDifficulty.toFixed(2));
                      $scope.diffData.push(diff[i].count);
                 };
               }

               //effitiveness
               var eff = response.data[2];
               $scope.effLabels = [];
               $scope.effData = [];

               if (eff != "None"){
                 for (var i=0, len = eff.length; i < len; i++){
                    $scope.effLabels.push("Rate for " + eff[i].rEffectiveness.toFixed(2));
                    $scope.effData.push(eff[i].count);
                 };
               }

               //overall
               var over = response.data[3];
               $scope.overallLabels = [];
               $scope.overallData = [];

               // console.log(over);
               if (over != "None"){
                 for (var i=0, len = over.length; i < len; i++){
                    $scope.overallLabels.push("Rate for " + over[i].rating.toFixed(2));
                    $scope.overallData.push(over[i].count);
                 };
               }

              // console.log($scope.overallData, $scope.effData, $scope.diffData, $scope.overallData);

              if ($scope.overallData.length == 0){
                  document.getElementById("over").style.display = "none";
                  document.getElementById("overTag").style.display = "block";
              }

              if ($scope.effData.length == 0){
                  document.getElementById("eff").style.display = "none";
                  document.getElementById("effTag").style.display = "block";
              }

              if ($scope.diffData.length == 0){
                  document.getElementById("diff").style.display = "none";
                  document.getElementById("diffTag").style.display = "block";
              }

              // console.log($scope.overallData, $scope.effData, $scope.diffData, $scope.revData);
              // console.log($scope.overallLabels, $scope.effLabels, $scope.diffLabels, $scope.revLabels);


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

              // console.log(response.data);
               if (response.data == "No one rated"){
                  $scope.raters = "";
               }
               else{
                 $scope.self = response.data[0];
                 $scope.raters = response.data[1];
               }

               // console.log($scope.self, response.data[1]);
        
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