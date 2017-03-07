var myApp = angular.module('myApp');
var QuestionArray = new Array ();
var AnswerArray = new Array ();
var indexAnswer = 0;
var indexQuestion = 0;

myApp.controller('QuestionsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('QuestionsController loaded...');

	$scope.getQuestions = function(){
		$http.get('/api/questions').success(function(response){
			$scope.questions = response;
		});
	}

	$scope.addQuestion = function(){
		
		$http.post('/api/questions/', $scope.question).success(function(response){
			//window.location.href='#/questions';
            console.log('response received');
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

        disableAnswerButton(); 
    }
    
    $scope.checkAnswerButton = function(str){

        AnswerArray.push(str);
    }

    $scope.ChangeModalID = function(){

        u_ChangeModalID();
    }

    
    $scope.ChangeWarningID = function(){

        u_ChangeWarningModalID();
    }
    
    $scope.ChangeAnswerID = function(){

        u_ChangeAnswerID();
    }

}]);

var Dict_pro = [
{key:"#Prof.LawrenceBirnbaum", value:"COMPUTER VISION"},
{key:"#Prof.YingWu", value:"COMPUTER VISION"},

{key:"#Prof.AlokChoudhary", value:"DATA MINING"},
{key:"#Prof.AnkitAgrawal", value:"DATA MINING"},
{key:"#Prof.Wei-KengLiao", value:"DATA MINING"},
{key:"#Prof.EdwardMalthouse", value:"DATA MINING"},

{key:"#Prof.GoceTrajevski", value:"SENSORS"},
{key:"#Prof.PeterScheuermann", value:"SENSORS"},
{key:"#Prof.SimoneCampononi", value:"SENSORS"},

{key:"#Prof.FabianBustmante", value:"COMPUTER NETWORKS"},
{key:"#Prof.YanChen", value:"COMPUTER NETWORKS"},
{key:"#Prof.AleksandarKuzmanovic", value:"COMPUTER NETWORKS"},

{key:"#Prof.YanChen", value:"MALWARE"},

{key:"#Prof.PeterDinda", value:"DISTRIBUTED SYSTEMS"},
{key:"#Prof.FabianBustmante", value:"DISTRIBUTED SYSTEMS"},

{key:"#Prof.BarryNelson", value:"STATISTICS"},
{key:"#Prof.BruceAnkerman", value:"STATISTICS"},
{key:"#Prof.DanielApley", value:"STATISTICS"},

{key:"#Prof.EdwardMalthouse", value:"MARKETING"},
{key:"#Prof.TimCalkins", value:"MARKETING"},
{key:"#Prof.MichelleWienberger", value:"MARKETING"},

{key:"#Prof.DouglasMedin", value:"COGNITIVE SCIENCE"},
{key:"#Prof.JonManer", value:"COGNITIVE SCIENCE"},
{key:"#Prof.WilliamHorton", value:"COGNITIVE SCIENCE"},

{key:"#Prof.BonnieSpring", value:"CLINICAL PSYCHOLOGY"},
{key:"#Prof.CherylRampage", value:"CLINICAL PSYCHOLOGY"},
{key:"#Prof.DanielleBlack", value:"CLINICAL PSYCHOLOGY"},

{key:"#Prof.CLairCoyne", value:"CHILD PSYCHOLOGY"},
{key:"#Prof.JohnLavigne", value:"CHILD PSYCHOLOGY"},
{key:"#Prof.CarriHill", value:"CHILD PSYCHOLOGY"}];


var result = new Array();

function select_prof(input){
    
    var choice = result[input];
    // choice = choice.toUpperCase();
//     console.log("choice", choice);
    choice = choice.substring(0, choice.indexOf("<"));

    var change_search = document.getElementById("edit_search").value;
	
    
    if (change_search[0] != "#")
        document.getElementById("edit_search").value = "";

    document.getElementById("edit_search").value += choice + " ";
    document.getElementById("edit_search").style.color = "#0E78E8";
    result = [];
    document.getElementById("search_results").innerHTML = "";
}

function notshowthis(){

    document.getElementById("search_results").innerHTML = "";
    // document.getElementById("select").style.display = "none";
}

// function getSpecial(input){

//     for (var i=0;i<Dict_pro.length;i++){
//             if (Dict_pro[i].key.indexOf(input) != -1){

//                 console.log("result",Dict_pro[i].value);
//                 return Dict_pro[i].value.toLowerCase();
                
//             }
//     }

// }

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
	    
	

        for (var i=0;i<Dict_pro.length;i++){
		
	var temp = Dict_pro[i].key.toLowerCase();
        if (temp.indexOf(str_needle.toLowerCase()) != -1){
                result.push(Dict_pro[i].key + "<br\>@ " + Dict_pro[i].value.toLowerCase());
        }
            if (Dict_pro[i].value.indexOf(str_needle) != -1){

                result.push(Dict_pro[i].key + "<br\>@ " + Dict_pro[i].value.toLowerCase());
                // console.log("result",result);
            }
        }
    }

    var full_list = "";

    for (var i=0;i<result.length;i++){
        full_list += '<li onclick="select_prof(' + i + ');\"'+'>' + result[i] + "</li>"; 
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

function u_ChangeWarningModalID(){

    var ids = document.getElementsByClassName("warningModal");

     for (var i=0; i<ids.length; i++){
        // console.log("ids", ids[i].id);
        ids[i].id = "warningModal" + i;
        // console.log("new_ids", ids[i].id);
    }

}

function u_ChangeAnswerID(){

    var ids = document.getElementsByClassName("answerPanel");

     for (var i=0; i<ids.length; i++){
        // console.log("ids", ids[i].id);
        ids[i].id = "inputAnswer" + i;
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
    // console.log("TempName", TempName);

    // var $target = $(TempName);

    // if (str[str.length-1] == 0)
    $(TempName).modal('show');

    indexQuestion = str[str.length-1];
    localStorage.setItem("indexQuestion", indexQuestion);

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
