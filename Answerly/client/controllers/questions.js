var myApp = angular.module('myApp');

myApp.controller('QuestionsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('QuestionsController loaded...');

	$scope.getQuestions = function(){
		$http.get('/api/questions').success(function(response){
			$scope.questions = response;
		});
	}

	$scope.addQuestion = function(){
		
		$http.post('/api/questions/', $scope.question).success(function(response){
			window.location.href='#/questions';
		});
	}
}]);

var Dict_pro = [{key:"#Prof.Chase", value:"CHOCOLATE"},{key:"#Prof.Mike", value:"PSYCHOLOGY"},
{key:"#Prof.Cobe", value:"STATISTIC"}, {key:"#Prof.Chris", value:"ENGINEER"},
{key:"#Prof.Chen", value:"GRAPHIC"}, {key:"#Prof.Jack", value:"JAVA"},
{key:"#Prof.Peter", value:"MBA"}, {key:"#Prof.Michael", value:"JAVASCRIPT"},
{key:"#Prof.Roby", value:"MANAGEMENT"}];
var result = new Array();

function select_prof(input){
    
    var choice = result[input];
    // choice = choice.toUpperCase();
    console.log("choice", choice);

    var change_search = document.getElementById("edit_search").value;
    
    if (change_search[0] != "#")
        document.getElementById("edit_search").value = "";

    document.getElementById("edit_search").value += choice + "    ";
    result = [];
    document.getElementById("search_results").innerHTML = "";
}

function notshowthis(){

    document.getElementById("search_results").innerHTML = "";
    // document.getElementById("select").style.display = "none";
}

function getSpecial(input){

    for (var i=0;i<Dict_pro.length;i++){
            if (Dict_pro[i].key.indexOf(input) != -1){

                console.log("result",Dict_pro[i].value);
                return Dict_pro[i].value.toLowerCase();
                
            }
    }

}

function find_my_div() {

    //close_all();
    result = [];

    var o_edit = document.getElementById("edit_search");
    var str_needle = o_edit.value;
    
    

    str_needle = str_needle.toUpperCase();

    if (str_needle == "" || str_needle.length < 3){
        document.getElementById("search_results").innerHTML = "";
        result = [];
    }
    
    else{
        // console.log("str_needle",str_needle);
	    
	var temp = Dict_pro[i].key.toLowerCase();
        if (temp.indexOf(str_needle.toLowerCase()) != -1){
                result.push(Dict_pro[i].key);
        }

        for (var i=0;i<Dict_pro.length;i++){
            if (Dict_pro[i].value.indexOf(str_needle) != -1){

                result.push(Dict_pro[i].key);
                // console.log("result",result);
            }
        }
    }

    var full_list = "";

    for (var i=0;i<result.length;i++){
        full_list += '<li onclick="select_prof(' + i + ');\" title=\"'+ getSpecial(result[i]) +'\">' + result[i] + "</li>"; 
        // console.log("result[i]",result[i]); 
    }

    // console.log("result",result); 
    document.getElementById("search_results").innerHTML = full_list;

    //$("#search_results").text(full_list); 
}
