var app = angular.module('profile',[]);

app.controller('profile', function ($scope,$http,$timeout,$window) {  

    $scope.load_profile = function(){
        $http.get('/profile').then(function successCallback(response) {
               $scope.profileDetail = response.data;
               // $scope.profilePoints = $scope.profileDetail[0].points;
               $scope.legalname = $scope.profileDetail[0].first_name + " " + $scope.profileDetail[0].last_name;
               console.log($scope.profileDetail);
        }, function errorCallback(response){
               console.log("Error");
        });
    }

    $scope.load_takenCourse = function(){
        $http.get('/taken_Course').then(function successCallback(response) {
               $scope.takenCourses = response.data;

               console.log($scope.takenCourses);
        }, function errorCallback(response){
               console.log("Error");
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
      // console.log(rates);

      if (rates <= 2.0)
        $scope.rateClass = "label label-danger";
      else if (rates < 3.5 && rates > 2.0)
        $scope.rateClass = "label label-warning";
      else if (rates < 5.0 && rates > 3.5)
        $scope.rateClass = "label label-success";
      else
        $scope.rateClass = "label label-default";

    }

    $scope.Rate = function(selectedCourse){
        var rating = $("#rateYo").rateYo("rating");

        var data={
            myNetID:selectedCourse.netid,
            myCourseNum:selectedCourse.course_id,
            myCourseTerm:selectedCourse.term,
            myRate:rating
        }

        console.log(data);
        $("#rateYo").rateYo("destroy");

        $http.post('/rateCourse',data).success(function(data, status, headers, config) {

            // if(data.is_logged){
            //     $scope.LoginAlert = true;
            //     $window.location.href = "/main#?id="+data.id;
            // }else{
            //     $scope.LoginAlert = false;
            // }
            console.log(data);
            // $window.location.reload();

        }).error(function(data, status) {
            alert("Connection Error");
        });

        

    }

    
});













// $(".btn-success").click(function() {
//   $row = $(this).closest("tr");
//   $id = $row.find("td:nth-child(1)").text();
//   $name = $row.find("td:nth-child(2)").text();
//   $prof = $row.find("td:nth-child(3)").text();
//   $rate = $row.find("td:nth-child(4)").text();

//   // console.log($row, $id, $name, $prof, $rate);
//   $("#courseID").text('Rate the Course ' + $id);
//   $("#courseName").text($name);
//   $("#courseProf").text($prof);
//   $("#courseRate").text($rate);

//   // changeClass($rate);

//   // $("#rateYo1").rateYo({
//   //   readOnly: true,
//   //   rating: $rate,
//   //   starWidth: "40px",
//   //   multiColor: {
//   //     "startColor": "#FF5A5F", //RED
//   //     "endColor"  : "#A2D729"  //GREEN
//   //   },  
//   // });

//   $("#rateYo2").rateYo({
//     normalFill: "#A0A0A0",
//     halfStar: true,
//     starWidth: "40px",
//     multiColor: {
//       "startColor": "#FF5A5F", //RED
//       "endColor"  : "#A2D729"  //GREEN
//     }
//   });
// });

// $("#getRating").click(function () {
//   var rating = $("#rateYo2").rateYo("rating");
 
//   window.alert("Its " + rating + " Yo!");
// });

// // function changeClass(rates){
// //       if (rates <= 2.0)
// //         $scope.rateClass = "label label-danger";
// //       else if (rates < 3.5 && rates > 2.0)
// //         $scope.rateClass = "label label-warning";
// //       else if (rates < 5.0 && rates > 3.5)
// //         $scope.rateClass = "label label-success";
// //       else
// //         $scope.rateClass = "label label-default";

// // }