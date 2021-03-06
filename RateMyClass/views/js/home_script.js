var app = angular.module('home',['ngAnimate', 'toaster']);


/* 
	Making factory method for socket 
*/
app.factory('socket', function ($rootScope) {
	var socket = io.connect();
	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {  
				var args = arguments;
				$rootScope.$apply(function () {
			  		callback.apply(socket, args);
				});
		  	});
		},
		emit: function (eventName, data, callback) {
		  	socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
			  		if (callback) {
						callback.apply(socket, args);
			  		}
				});
		  	})
		}
  	};
});

/* 
	Making service to run ajax 
*/
app.service('runajax', ['$http', function ($http) {
  this.runajax_function = function(request,callback){
	var url=request.url;
	var data_server=request.data_server;
	$http.post(url,data_server).success(function(data, status, headers, config) {
	  callback(data);
	})
	.error(function(){
	  callback("data");
	});
  }
}]);


/* 
	Making directive to send is Typing Notification 
*/
app.directive('sendTypingNotification', function () {
  return{
	require: 'ngModel',
	restrict: 'A',
	link:function (scope, element, attrs,ctrl) {
	  element.bind("keydown keypress", function (event) {
		scope.self.sendTypingNotification(event.type);
		scope.send_text=element.val();
	  });
	  scope.$watch(attrs.updateModel, function(value) {
		ctrl.$setViewValue(value);
		ctrl.$render();
	  });
	}
  }      
});

app.controller('home', function ($scope,$location,$window,$sce,$timeout,toaster,socket,runajax,$rootScope,$http) {
  
	$scope.show_userinfo=""; //To contain user information.
  	$scope.userlist=""; //To contain list of users.
  	$scope.RecentUserList=""; //To contain list of users.
  	$scope.uid="";
	$scope.hightlight_id="";
  	$scope.hightlight_socket_id="";
  	$scope.send_to_userinfo="";
  	$scope.send_to_user_name="";
  	$scope.send_text;
  	$scope.msgs=[];
  	$scope.userinfo="";
  	$scope.targetUser = angular.fromJson($window.sessionStorage.getItem('target'));
  	$scope.message = angular.fromJson($window.sessionStorage.getItem('message'));

  	// console.log($scope.targetUser, $scope.message);
  	//remember to sessionStorage.clear(); after use the data.

  	// $scope.get_user_name=function(){
  	// 	temp="";
  	// 	$http.get('/get_user_id').success(function successCallback(response){
  	// 		temp=response.data;
  	// 		console.log("get user name", temp);
  	// 		$scope.uid = temp;
  	// 		return temp;
  	// 	}, function errorCallback(){
  	// 		console.log("user fetch error");
  	// 		return temp;
  	// 	})
  	// }
  

	/* Making Usefull function*/
	$scope.self={
		getUserInfo: function(callback){
			// var uid=$location.search()['id'];
			// var uid=$scope.get_user_name();
			// var uid=$scope.targetUser;
			// var uid="ads9122";
			// $scope.uid=uid;
			// console.log("in getuserinfo");
			var data={
				url:'/get_userinfo',
				data_server:{
					uid:$scope.uid
				}
			};
			runajax.runajax_function(data,function(userdata){
				// console.log("user data get",userdata);       
				$scope.show_userinfo=userdata;
				$scope.uid = userdata.data.netid;
				if($window.sessionStorage.length != 0){
					$scope.send_msg("New msg",'',$scope.targetUser,$scope.message);
					$window.sessionStorage.clear();
					$scope.targetUser = "";
					$scope.message = "";
					// console.log("new message added");
				}       
				callback(userdata);
				// console.log("target user", $scope.targetUser);
			});

			// console.log("===", userinfo, userinfo.data);
			// socket.emit('userInfo',userinfo.data); // sending user info to the server	
		},
		getRecentChats: function(callback){
			// var uid=$location.search()['id'];
			// var uid=$scope.get_user_name();
			// var uid=$scope.targetUser;
			// var uid="ads9122";
			// $scope.uid=uid;
			// console.log("in getrecentChats");
			var data={
				url:'/get_recent_chats',
				data_server:{
					uid:$scope.uid
				}
			};
			runajax.runajax_function(data,function(userdata){
				callback(userdata);
				// console.log("userdata===",userdata);
			});
		},
		getUsersToChats:function(callback){
		  // var uid=$location.search()['id'];
		  // var uid=$scope.get_user_name();
		  // var uid=$scope.targetUser;
		  // var uid="ads9122";
		  // $scope.uid=uid;
		  // console.log("in getUsersToChats");
		  var data={
			url:'/get_users_to_chats',
			data_server:{
			  uid:$scope.uid
			}
		  };
		  runajax.runajax_function(data,function(userdata){
			callback(userdata);
		  });
		},
		getMsg:function(msgs_userinfo,callback){
			// console.log("in getMsg");
		  var data={
			url:'/get_msgs',
			data_server:{
			  uid:$scope.uid,
			  from_id:msgs_userinfo.netid
			}
		  }
		  runajax.runajax_function(data,function(userdata){        
			callback(userdata);
		  });
		},
		scrollDiv:function(){
		  var scrollDiv = angular.element( document.querySelector( '.msg-container' ) );
		  $(scrollDiv).animate({scrollTop: scrollDiv[0].scrollHeight}, 900);
		},
		sendTypingNotification:function(eventName){
			// console.log("in sendTypingNotification");
		  var TypeTimer;                
		  var TypingInterval = 2000;
		  var data_server={
			  data_uid:$scope.uid,
			  data_fromid:$scope.hightlight_id,
			  data_socket_fromid:$scope.hightlight_socket_id
			}; 
		  if ( eventName=="keypress" ) {
			$timeout.cancel(TypeTimer);
			data_server.event_name='keypress';
			socket.emit('setTypingNotification',data_server);
		  }else {
			TypeTimer=$timeout( function(){
			  data_server.event_name='keydown';
			  socket.emit('setTypingNotification',data_server);
			}, TypingInterval);
		  }
		}
	};

	/*
		Function To get 'user information as well as invokes to get Chat list' 
	*/
	$scope.self.getUserInfo(function(userinfo){
		socket.emit('userInfo',userinfo.data); // sending user info to the server
		// console.log("called getUserInfo");
	});
  

	/*
		Function To show selected user from chat list  
	*/  
	$scope.hightlight_user=function(send_to_userinfo){
		// console.log("in hightlight_user");
		$scope.send_to_userinfo=send_to_userinfo;
		$scope.hightlight_id=send_to_userinfo.netid;
		$scope.send_to_user_name=send_to_userinfo.first_name+send_to_userinfo.last_name; 
		$scope.hightlight_socket_id=send_to_userinfo.socketId; 

		
		$scope.self.getMsg(send_to_userinfo,function(result){
		  $scope.msgs="";
		  if(result != 'null'){
			$scope.msgs=result;
		  }
		});
	};

	/*
		Function To get 'chat list' 
	*/
	$scope.get_recent_chats=function(){
		$scope.self.getRecentChats(function(offlineUsers){
			$scope.RecentUserList=offlineUsers;
		});
	};

	/*
		Function To get 'start new chat list' 
	*/
	$scope.get_users_to_chats=function(){
		$scope.self.getUsersToChats(function(newUsers){
		  $scope.RecentUserList=newUsers;
		});
	};

	/*
		Function To send messages
	*/  
	$scope.send_msg=function(fromModal,socketId,toid,targetMsg){
		// console.log("in send_Msg");
		if(fromModal==""){
			if($scope.send_to_userinfo != ""){
				if($scope.send_text==""){
					alert("Message can't be empty.");
				} else{
					var data={
						socket_id:$scope.send_to_userinfo.socketId,
						to_id:$scope.send_to_userinfo.netid,
						from_id:$scope.uid,
						msg:$scope.send_text
					};
					// console.log(data);
					// sending user info to the server starts
					socket.emit('sendMsg',data);

					$scope.msgs.push({
						msg:$scope.send_text,
						from_id:$scope.uid,
						to_id:$scope.send_to_userinfo.netid,
						timestamp:Math.floor(new Date() / 1000)
					});
					$scope.send_text="";
					$scope.self.scrollDiv();
				}           
			}else{
			  alert("Select a user to send Message.");
			}  
		}else{
			if($scope.targetMsg == ""){
				var getMsgText =angular.element( document.querySelector( '#msg_modal'+'_'+toid ) ).val();
			}
			else {
				var getMsgText =targetMsg;
			}
			if(getMsgText==""){
				alert("Message can't be empty.");
			}else{
				var data={
					socket_id:null,
					to_id:toid,
					from_id:$scope.uid,
					msg:getMsgText
				};
				socket.emit('sendMsg',data);
			}
		}
	};


	/*
		To hide and show the Message box inside Modal
	*/
	$scope.hideShowMsgBox=function(id,action,$event){
		// console.log("in hideShowMsgBox");
		var hideShowEle = angular.element( document.querySelector( '.collapseMsgBox'+'_'+id ) ); 
		var hidEle=angular.element( document.querySelector( '.hideMSgBox'+'_'+id ) );
		var showEle=angular.element( document.querySelector( '.showMSgBox'+'_'+id ) );

		

		if(action=="hide"){
			hideShowEle.addClass('send-msg-hidden');
			hideShowEle.removeClass('send-msg-show');
			showEle.removeClass('send-msg-hidden');
			showEle.addClass('send-msg-show');
			hidEle.addClass('send-msg-hidden');
			hidEle.removeClass('send-msg-show');
		}else{
			hideShowEle.addClass('send-msg-show');
			hideShowEle.removeClass('send-msg-hidden');
			showEle.addClass('send-msg-hidden');
			showEle.removeClass('send-msg-show');
			hidEle.removeClass('send-msg-hidden');
			hidEle.addClass('send-msg-show');
		}
	}

	
	/*---------------------------------------------------------------------------------
		Socket on event starts
  	---------------------------------------------------------------------------------*/


  	/*
		Function to show messages.
  	*/
	socket.on('getMsg',function(data){
		// console.log("in socket getMsg");
		if($scope.send_to_userinfo != ""){
	  		$scope.self.getMsg($scope.send_to_userinfo,function(result){
				$scope.msgs="";
				$scope.msgs=result;
				$scope.self.scrollDiv();
	  		});    
		}

		/*
	  		Using Toaster to show notifications
		*/
		toaster.pop('success',data.name+" sent you a message", data.msg,5000);
  	});

	/*
		Function to update user list when one user goes offline.
	*/
  	socket.on('getTypingNotification',function(data){
  		// console.log("in socket getTypingNotification");
		if(data.event_name=="keypress"){
	  		angular.element('#isTyping_'+data.data_uid).css('display','block');
		}else{
	  		angular.element('#isTyping_'+data.data_uid).css('display','none');      
		}
  	});

  	socket.on('exit',function(data){
  		// console.log("in socket exit");
  		$scope.self.getUserInfo(function(userinfo){
			socket.emit('userInfo',userinfo.data); // sending user info to the server  
		});
  	});
  	/*
		Function to show Chat List.
  	*/
	socket.on('userEntrance',function(data){
		$scope.userlist=data;

		// console.log("$scope.userlist == ", $scope.userlist);
  	});

 
  	/*---------------------------------------------------------------------------------
		Socket on event Ends
  	---------------------------------------------------------------------------------*/
});