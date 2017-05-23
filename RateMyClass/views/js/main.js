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

var app = angular.module('main',[]).run(function($rootScope) {
    $rootScope.uid = "abc";
})

app.controller('main', function ($scope,$http,$timeout,$window,$rootScope) {

	$scope.logOut = function(){
      $http.get('/logout').then(function successCallback(response) {
               console.log("Log Out");
               $window.location.href = "chat_login.html";
        }, function errorCallback(response){
               console.log("Log Out Error");
      });
  }

  $scope.checkLogin = function(){
      $http.get('/main').then(function successCallback(response) {
          console.log(response);
          
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
                    timer: 6000
          }).then(function(){
                    $scope.logOut();
          }) 
      });
  }
});