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

    $scope.sendEmail =function(){
        $http.post('api/questions/email',$scope.question).success(function(response){
            // window.location.href='#/questions';
            console.log('response received');
        });
    }
    
    $scope.HaveAnswerButton = function(){

        ChangeButtonID(); 

//         disableAnswerButton(); 
    }
    
    $scope.checkAnswerButton = function(str){

        AnswerArray.push(str);
    }

    $scope.ChangeModalID = function(){

        u_ChangeModalID();
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

function u_ChangeModalID(){

    var ids = document.getElementsByClassName("ModalID");

     for (var i=0; i<ids.length; i++){
        // console.log("ids", ids[i].id);
        ids[i].id = "ModalID" + i;
        // console.log("new_ids", ids[i].id);
    }

}

function ChangeButtonID(){

    var ids = document.getElementsByClassName("AnswerButton");
    // console.log("ids", ids);

    for (var i=0; i<ids.length; i++){
        // console.log("ids", ids[i].id);
        ids[i].id = "AnswerButton" + i;
        // console.log("new_ids", ids[i].id);
    }
}

function OpenModal(str){

    var TempName = "#ModalID" + str[str.length-1];
    console.log("TempName", TempName);

    // var $target = $(TempName);

    // if (str[str.length-1] == 0)
    $(TempName).modal('show');

}

function disableAnswerButton(){
    // console.log("1");
    for (var i=indexAnswer; i<AnswerArray.length; i++){
        console.log("i", i);
        console.log("AnswerArray[i]", AnswerArray[i]);
        if (AnswerArray[i] != ""){
            var temp_id = "AnswerButton" + i;
            console.log("temp_id", temp_id);

            document.getElementById(temp_id).style.visibility='hidden';
        }
    }

    indexAnswer++;
}
