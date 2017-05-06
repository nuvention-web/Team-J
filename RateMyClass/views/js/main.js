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
