var app = angular.module('profile',[]);

app.controller('profile', function ($scope,$http,$timeout,$window) {  

    $scope.logOut = function(){
      $http.get('/logout').then(function successCallback(response) {
               console.log("Log Out");
               $window.location.href = "chat_login.html";
        }, function errorCallback(response){
               swal({
                    title: 'Error!',
                    text: 'Log out error!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake',
                    timer: 4000
              })
        });
    }

    $scope.load_profile = function(){


        $http.get('/profile').then(function successCallback(response) {
               $scope.profileDetail = response.data;
               $scope.legalname = $scope.profileDetail[0].first_name + " " + $scope.profileDetail[0].last_name;
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

    $scope.load_takenCourse = function(){
        $http.get('/taken_Course').then(function successCallback(response) {
               $scope.takenCourses = response.data;
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

    $scope.changeRateValue = function(rates){
        if (rates != null)
            $scope.personalRate = rates;
        else
            $scope.personalRate = "Rate Now";
    }

    $scope.rateCourse = function(detail){

        $scope.selectedCourse = detail;

        $("#detailModal").modal('show');
        $scope.changeClass(detail.rating);

        $("#rateYo").rateYo({
            normalFill: "#A0A0A0",
            halfStar: true,
            starWidth: "40px",
            multiColor: {
              "startColor": "#FF5A5F", //RED
              "endColor"  : "#A2D729"  //GREEN
            }
        });

    }

    $scope.changeClass = function(rates){

      if (rates <= 2.0)
        $scope.rateClass = "label label-danger";
      else if (rates < 3.5 && rates > 2.0)
        $scope.rateClass = "label label-warning";
      else if (rates <= 5.0 && rates >= 3.5)
        $scope.rateClass = "label label-success";
      else
        $scope.rateClass = "label label-default";

    }

    $scope.Rate = function(selectedCourse){

       if (selectedCourse.myRate != 0){

          swal({
                    title: 'Error!',
                    text: 'You already rated this course!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake',
                    timer: 4000
          })

          $window.location.reload();
       }
       else{
          var rating = $("#rateYo").rateYo("rating");

          if (rating == 0){
            swal({
                    title: 'Warning!',
                    text: 'You can\'t rate 0!',
                    type: 'warning',
                    animation: false,
                    customClass: 'animated shake',
                    timer: 3000
            })
          }

          else{
            var data={
                myNetID:selectedCourse.netid,
                myCourseNum:selectedCourse.class_num,
                myCourseTerm:selectedCourse.term,
                myRate:rating,
                myNumofRates:selectedCourse.no_of_students,
                myAverageRate:selectedCourse.rating
            }

            data.myAverageRate = (data.myNumofRates * data.myAverageRate + data.myRate) / (data.myNumofRates + 1);
            data.myNumofRates = data.myNumofRates + 1;

            $("#rateYo").rateYo("destroy");

            $http.post('/rateCourse',data).success(function(data, status, headers, config) {
                $window.location.reload();
            }).error(function(data, status) {
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
       }       

    }

    $scope.passwordChangeModal = function(){

        $("#passwordChangeModal").modal('show');
        $scope.oldPasswordAlert = true;
        $scope.newPasswordAlert = true;
        $scope.newPasswordConfirmAlert = true;
    }

    $scope.checkOldPassword = function(){

        if ($scope.oldPassword == undefined)
          $scope.oldPasswordAlert = false;

        else{
          var data={
              username:$scope.profileDetail[0].netid,
              password:$scope.oldPassword
          }
          
          $http.post('/oldPassword',data).success(function(data, status, headers, config) {

              if (data.msg == false)
                $scope.oldPasswordAlert = false;
              else
                $scope.oldPasswordAlert = true;
          }).error(function(data, status) {
              swal({
                    title: 'Error!',
                    text: 'Connection Error!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake'
              })
          });
        }
    }


    $scope.checkNewPassword = function(){

        var newPassword = $scope.newPassword;

        if (newPassword.length < 8 || newPassword == undefined)
          $scope.newPasswordAlert = false;
        else
          $scope.newPasswordAlert = true;
    }

    $scope.checkNewPasswordConfirm = function(){

        var newPassword = $scope.newPassword;
        var confirmPassword = $scope.newPasswordConfirm;

        if (newPassword != confirmPassword)
          $scope.newPasswordConfirmAlert = false;
        else
          $scope.newPasswordConfirmAlert = true;
    }

    $scope.passwordChange = function(){

        if ($scope.newPasswordAlert == false || $scope.newPasswordConfirmAlert == false || $scope.oldPasswordAlert == false){
                swal({
                    title: 'Error!',
                    text: 'Invalid Inputs!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake'
                })
        }
        else{

            var data={
              username:$scope.profileDetail[0].netid,
              password:$scope.newPassword
            }

            $http.post('/changePassword',data).success(function(data, status, headers, config) {

                if (data.msg == false){
                    swal({
                      title: 'Error!',
                      text: 'Unable to change, please try again!',
                      type: 'error',
                      allowOutsideClick : false,
                      animation: false,
                      customClass: 'animated shake'
                    })
                }
                  
                else{
                  swal({
                      title: 'Great!',
                      text:  'Your password changed!',
                      type: 'success'
                  })
                  $("#passwordChangeModal").modal('hide');
                }
            }).error(function(data, status) {
                swal({
                    title: 'Error!',
                    text: 'Connection Error!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake'
                })
            });
        }

    }



});

