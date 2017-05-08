var app = angular.module('profile',[]);


app.controller('profile', function ($scope,$http,$timeout,$window) {  

    
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