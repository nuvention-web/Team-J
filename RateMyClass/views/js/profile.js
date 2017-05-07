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

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var recipient = button.data('whatever');
  var name = "";
  var rate = 0;

  courses.forEach(function(course){
        if (recipient == course.Num){
            name = course.Name;
            rate = course.Rate;
        }        
  });

  var modal = $(this);
  modal.find('.modal-title').text('Rate the Course ' + recipient);
  modal.find('.modal-body h4').text(name);
});

$(".btn-success").click(function() {
  $row = $(this).closest("tr");
  $rate = $row.find("td:nth-child(4)").text();

  $("#rateYo1").rateYo({
    starWidth: "40px",
    readOnly: true,
    rating: $rate,
    multiColor: {
      "startColor": "#FF5A5F", //RED
      "endColor"  : "#A2D729"  //GREEN
    },  
  });

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

$("#getRating").click(function () {
  var rating = $("#rateYo2").rateYo("rating");
 
  window.alert("Its " + rating + " Yo!");
});