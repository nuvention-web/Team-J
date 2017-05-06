var courses = [
    {"Num":100, "Name":"Electrons, Photons, And Bits: Adventures In Electrical And Computer Engineering",
        "Rate":4.35 },
    {"Num":110, "Name":"Intro To Computer Programming",
        "Rate":2.69 },
    {"Num":111, "Name":"Fundamentals Of Computer Programming I",
        "Rate":3.03 },
    {"Num":202, "Name":"Intro To Electrical Engineering",
        "Rate":3.98 },
    {"Num":203, "Name":"Intro To Computer Engineering",
        "Rate":3.15 }
    ];

var rate = 0.0;

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) 
  var recipient = button.data('whatever') 
  var name = "";

  courses.forEach(function(course){
        if (recipient == course.Num){
            name = course.Name;
            rate = course.Rate;
        }        
  })

  var modal = $(this)
  modal.find('.modal-title').text('Rate the Course ' + recipient)
  modal.find('.modal-body h4').text(name)
  modal.find('#rateNumber').text(rate)
})



$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

$(function () {

  $("#rateYo1").rateYo({
    starWidth: "40px",
    readOnly: true,
    multiColor: {
      "startColor": "#FF5A5F", //RED
      "endColor"  : "#A2D729"  //GREEN
    },
    onInit: function (rate) {}
 
      
  });

});

$(function () {

  $("#rateYo2").rateYo({

    starWidth: "40px",
    normalFill: "#A0A0A0",
    halfStar: true,
    multiColor: {
      "startColor": "#FF5A5F", //RED
      "endColor"  : "#A2D729"  //GREEN
    }
  });
});