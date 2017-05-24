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
        // console.log(detail);

        $("#detailModal").modal('show');
        $("#rateNumber").text('0');
        $("#rateNumber1").text('0');
        $("#rateNumber2").text('0');
        $scope.changeClass(detail.rating);
        $scope.changeClass(detail.difficulty);
        $scope.changeClass(detail.effectiveness);

        $("#rateYo").rateYo({
            normalFill: "#A0A0A0",
            halfStar: true,
            starWidth: "40px",
            rating: 0,
            multiColor: {
              "startColor": "#FF5A5F", //RED
              "endColor"  : "#A2D729"  //GREEN
            },
            onChange: function (rating) {
                $(this).next().text(rating);
            }
        });

        $("#rateYo1").rateYo({
            normalFill: "#A0A0A0",
            halfStar: true,
            starWidth: "40px",
            rating: 0,
            multiColor: {
              "startColor": "#A2D729", 
              "endColor"  : "#FF5A5F"
            },
            onChange: function (rating) {
                var show;
                if (rating >=0 && rating < 1.5)
                  show = "Easy";
                else if (rating >=1.5 && rating <= 3.5)
                  show = "Medium";
                else
                  show = "Diffcult";
                $(this).next().text(show);
            }
        });

        $("#rateYo2").rateYo({
            normalFill: "#A0A0A0",
            halfStar: true,
            starWidth: "40px",
            rating: 0,
            multiColor: {
              "startColor": "#FF5A5F", //RED
              "endColor"  : "#A2D729"  //GREEN
            },
            onChange: function (rating) {
                var show;
                if (rating >=0 && rating < 1.5)
                  show = "Ineffective";
                else if (rating >=1.5 && rating <= 3.5)
                  show = "Somewhat Useful";
                else
                  show = "Highly Useful ";
                $(this).next().text(show);
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

    $scope.closeRate = function(){
      $("#detailModal").modal('hide');
      $("#rateYo").rateYo("destroy");
      $("#rateYo1").rateYo("destroy");
      $("#rateYo2").rateYo("destroy");
      $("#rateNumber").text('0');
      $("#rateNumber1").text('0');
      $("#rateNumber2").text('0');
      $("#reviews").val('');
    }

    $scope.Rate = function(selectedCourse){

       var ratedFlag = false;
       if (selectedCourse.myRate != 0)
            ratedFlag = true;

       if (selectedCourse.effectiveness != 0){

          swal({
                    title: 'Error!',
                    text: 'You already rated this course!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake',
                    timer:7000
          }).then(function(){
             $window.location.reload();
          })

          
       }
       else{
          var rating = $("#rateYo").rateYo("rating");
          var rating1 = $("#rateYo1").rateYo("rating");
          var rating2 = $("#rateYo2").rateYo("rating");
          var review = $('#reviews').val();

          // console.log(ratedFlag);

          if (rating == 0 || rating1 == 0 || rating2 == 0){
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
                myrDifficulty:rating1,
                myrEffectiveness:rating2,

                myNumofRates:selectedCourse.no_of_students,
                myOurNum:selectedCourse.our_num,
                myAverageRate:selectedCourse.rating,
                myAverageDifficulty:selectedCourse.difficulty,
                myAverageEffectiveness:selectedCourse.effectiveness,
                myReview:review,

                myFlag:ratedFlag
            }

            data.myAverageRate = (data.myNumofRates * data.myAverageRate + data.myRate) / (data.myNumofRates + 1);
            data.myAverageDifficulty = (data.myOurNum * data.myAverageDifficulty + data.myrDifficulty) / (data.myOurNum + 1);
            data.myAverageEffectiveness = (data.myOurNum * data.myAverageEffectiveness + data.myrEffectiveness) / (data.myOurNum + 1);
            data.myNumofRates = data.myNumofRates + 1;
            data.myOurNum = data.myOurNum + 1;

            // console.log(data.myReview);

            $http.post('/rateCourse',data).success(function(data, status, headers, config) {
                swal({
                      title: 'Success!',
                      text:  'You rated this course',
                      allowOutsideClick : false,
                      type: 'success'
                })

                $("#detailModal").modal('hide');
                $("#rateYo").rateYo("destroy");
                $("#rateYo1").rateYo("destroy");
                $("#rateYo2").rateYo("destroy");
                $("#rateNumber").text('0');
                $("#rateNumber1").text('0');
                $("#rateNumber2").text('0');
                $window.location.reload();
            }).error(function(data, status) {
                swal({
                    title: 'Error!',
                    text: 'Connection Error!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake',
                })

                $("#detailModal").modal('hide');
                $("#rateYo").rateYo("destroy");
                $("#rateYo1").rateYo("destroy");
                $("#rateYo2").rateYo("destroy");
                $("#rateNumber").text('0');
                $("#rateNumber1").text('0');
                $("#rateNumber2").text('0');
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

        if (newPassword == undefined)
          $scope.newPasswordAlert = false;
        else if (newPassword.length < 8)
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

        $scope.checkOldPassword();
        $scope.checkNewPassword();
        $scope.checkNewPasswordConfirm();
        if ($scope.newPassword == undefined || $scope.newPasswordConfirm == undefined || $scope.oldPassword == undefined){
            swal({
                    title: 'Error!',
                    text: 'Empty Inputs!',
                    type: 'error',
                    allowOutsideClick : false,
                    animation: false,
                    customClass: 'animated shake'
            })
        }

        else if ($scope.newPasswordAlert == false || $scope.newPasswordConfirmAlert == false || $scope.oldPasswordAlert == false){
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
                  }).then(function(){
                    $("#passwordChangeModal").modal('hide');
                  })
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

