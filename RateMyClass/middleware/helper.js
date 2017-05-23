var self={
	queryRunner:function(data,callback){
		/*
			Function required to run all the queries.
		*/
		var db_conncetion=data.connection;
		var query=data.query;
		var insert_data=data.insert_data;
		db_conncetion.getConnection(function(err,con){
			if(err){
			  con.release();
			}else{
				db_conncetion.query(String(query),insert_data,function(err,rows){
			    con.release();
			    if(!err) {
			    	callback(rows);
			    } else {
			      console.log(err);  
			      console.log("Query failed");  
			    }        
			  });
			}
		});
	},
	getLastConversationId:function(connection,callback){
		/*
			Function to get last conversation ID.
		*/
		var data={
			query:"SELECT MAX(con_id) as ID FROM conversation",
			connection:connection
		}
		self.queryRunner(data,function(result){
			// console.log("get last conversation",result);
			if(result[0].ID!=null){
				var conversationid=parseInt(result[0].ID);
				conversationid++;
				callback({
					ID:conversationid
				});
			} else{
				callback({
					ID:0
				});
			}

		});
	},
	isConversationPresent:function(data,connection,callback){
		/*
			Function to check conversation is present in DB conversations table.
		*/
		var is_present=false;
		var con_id="";
		var is_present_data={
			query:"select * from conversation where to_id='"+data.to_id+"' and from_id='"+data.from_id+"' or to_id='"+data.from_id+"' and from_id='"+data.to_id+"' limit 1",
			connection:connection
		}
		self.queryRunner(is_present_data,function(result){
			// console.log("is conversation present",result);
			if(result.length>0){
				/* data for callback starts*/
				is_present=true;
				con_id=result[0].con_id;

			} else{
				//data for callback 
				is_present=false;
				con_id=0
			}
			callback({
				is_present:is_present,
				con_id:con_id
			});
		});
	},
	insertConversation:function(data,connection,callback){
		/*
			Function to insert consersation.
		*/	
		var tmp_id = 0
		var insert_conversation={
			query:"INSERT INTO conversation SET ?",
			connection:connection,
			insert_data:{
				id:tmp_id++,						
				from_id:data.from_id,
				to_id:data.to_id,
				timestamp:Math.floor(new Date() / 1000),
				con_id:data.con_id
			}
		};
		self.queryRunner(insert_conversation,function(result){
			// console.log("insert conversation",result);
			callback(result.insertId);
		});	
	},
	insertMsg:function(data,connection,callback){
		/*
			Function to insert messages.
		*/
		var tmp_id = 0
		var data_insert={
			query:"INSERT INTO conversation_reply SET ?",
			connection:connection,
			insert_data:{
				id:tmp_id++,						
				reply:data.msg,
				from_id:data.from_id,
				to_id:data.to_id,
				timestamp:Math.floor(new Date() / 1000),
				con_id:data.con_id
			}
		};	
		self.queryRunner(data_insert,function(result){
			// console.log("msg inserted");
			callback(result)
		});
	},
	callMsgAfterConversation:function(data,connection,callback){
		/*
			Separate Function to insert message and conversation in DB ( Just to make our code short ).
		*/
		var conversation_data={
			to_id:data.to_id,
			from_id:data.from_id,
			con_id:data.conversation_id
		}
		self.insertConversation(conversation_data,connection,function(is_insert_conversation){
			
			/* 
				call 'self.insert_msg' to insert messages 
			*/
			var tmp_id = 0	
			var insert_msg={
				id:tmp_id++,
				msg:data.msg,
				from_id:data.from_id,
				to_id:data.to_id,
				timestamp:Math.floor(new Date() / 1000),
				con_id:data.conversation_id
			}
			self.insertMsg(insert_msg,connection,function(is_insert_msg){
				// console.log("call msg after conversation",is_insert_msg);
				callback({
					msg:data.msg,
					from_id:data.from_id,
					to_id:data.to_id,
					timestamp:Math.floor(new Date() / 1000)
				});
			});
		});
	},
	saveMsgs:function(data,connection,callback){
		
		/*	Calling "self.isConversationPresent" function,
			to check is conversation is already present or not.
		*/
		console.log(data);
		var check_data={
			to_id:data.to_id,
			from_id:data.from_id
		}
		/* 
			checking 'conversation' is present in Database conversation table
		*/
		self.isConversationPresent(check_data,connection,function(is_present){
				
		
			if(is_present.is_present){
				
				var msg_after_conversation={
					to_id:data.to_id,
					from_id:data.from_id,
					msg:data.msg,
					conversation_id:is_present.con_id
				};

				/* 
					caling 'self.callMsgAfterConversation' to insert message and conversation
				*/
				self.callMsgAfterConversation(msg_after_conversation,connection,function(insert_con_msg){
					self.getUserInfo(data.from_id,connection,function(UserInfo){
						// console.log("save msgs ifff",UserInfo);
						insert_con_msg.first_name=UserInfo.data.first_name;
						callback(insert_con_msg);
					});
				});

				
			} else{
				/* 
					call 'self.getLastConversationId' to get last conversation ID 
				*/	
				self.getLastConversationId(connection,function(con_id){
					
					var msg_after_conversation={
						to_id:data.to_id,
						from_id:data.from_id,
						msg:data.msg,
						conversation_id:con_id.ID
					};

					/* 
						caling 'self.callMsgAfterConversation' to insert message and conversation
					*/
					self.callMsgAfterConversation(msg_after_conversation,connection,function(insert_con_msg){
						self.getUserInfo(data.from_id,connection,function(UserInfo){
							// console.log("save msgs ifff",UserInfo);
							insert_con_msg.first_name=UserInfo.data.first_name;
							callback(insert_con_msg);
						});
					});
				});
			}

		});
	},
	getMsgs:function(data,connection,callback){
		/*
			Function to get messages.
		*/
		var data={
			query:"select reply as msg,from_id,to_id,timestamp from conversation_reply where from_id='"+data.body.from_id+"' and to_id='"+data.session.uid+"' or  from_id='"+data.session.uid+"' and to_id='"+data.body.from_id+"' order by timestamp asc",
			connection:connection
		}
		self.queryRunner(data,function(result){
			// console.log("get msgs",result);
			if(result.length > 0){
				callback(result)
			} else{
				callback(null);
			}
		});
	},
	getUserInfo:function(uid,connection,callback){
		/*
			Function to get user information.
		*/
		var data={
			query:"select netid,first_name,p_photo,online from student where netid='"+uid+"'",
			connection:connection
		}
		self.queryRunner(data,function(result){
			// console.log("get User Info",result);
			if(result.length>0) {
				var user_info="";			
				result.forEach(function(element, index, array){
					user_info={
						first_name:element.first_name,
						p_photo:element.p_photo,
						online:element.online
					};	
				});
		    	result_send={
		    		data:user_info,
		    		msg:"OK"
		    	};
		    } else {
		    	result_send={
		    		data:null,
		    		msg:"BAD"
		    	};
		    }
		    callback(result_send);
		});
	},
	getUserChatList:function(uid,connection,callback){
		var data={
			query:"select DISTINCT con_id, max(timestamp) from conversation where to_id='"+ uid +"' or from_id='"+ uid +"' group by con_id order by max(timestamp) desc; ",
			connection:connection
		}
		self.queryRunner(data,function(result){
			// console.log("get user chat list p1",uid);
			var dbUsers=[];
			if(result.length>0){
				// console.log(result);
				result.forEach(function(element, index, array){
					// console.log("con_id in user chat",element.con_id);
					var data={
						query:"select s.netid,s.first_name,s.last_name,s.online,s.p_photo from conversation as c left join student as s on \
								  s.netid = case when (con_id='"+element.con_id+"' and to_id='"+uid+"') \
								THEN \
								  c.from_id \
								ELSE \
								  c.to_id \
								END \
								where con_id='"+element.con_id+"' and to_id='"+uid+"' or con_id='"+element.con_id+"' and from_id='"+uid+"' limit 1",
						connection:connection
					}
					self.queryRunner(data,function(usersData){
						// console.log("get user chat list p2",usersData);
						if(usersData.length>0){
							dbUsers.push(usersData[0]);
							// console.log("pushed to dbuser",dbUsers);							
						}
						if(index >= (result.length-1)){
							// console.log("callback with dbuser",dbUsers);
							callback(dbUsers);
						}
					});

				});
			}else{
				callback(null);
			}
		});
	},
	getUsersToChat:function(uid,connection,callback){
		var data={
			query:"SELECT to_id, from_id FROM conversation WHERE to_id='"+uid+"' OR from_id='"+uid+"'",
			connection:connection
		}
		self.queryRunner(data,function(result){
			// console.log("get users to chat",result);
			var dbUsers=[];
			if(result.length>0){
				var filter=[];
				result.forEach(function(element, index, array){
					filter.push("\'" + element['to_id'] + "\'");
					filter.push("\'" +element['from_id'] + "\'");
				});
				filter=filter.join();
				// console.log("user filter", filter);
				data.query="SELECT * FROM student WHERE netid NOT IN ("+filter+")";
			}else{
				data.query="SELECT * FROM student WHERE netid NOT IN ("+uid+")";
			}
			self.queryRunner(data,function(usersData){
				// console.log("get  user to chat inside",usersData);
				callback(usersData);
			});		
		});
	},
	mergeUsers:function(socketUsers,dbUsers,newUsers,callback){
		/*
			Function Merge online and offline users.
		*/
		var tempUsers = [];
		// console.log("socket users ", socketUsers);
		for(var i in socketUsers){
			// console.log("socket users index", i);
			var shouldAdd = false;
			for (var j in dbUsers){
				// console.log("dbusers", shouldAdd);
				if(newUsers=='yes'){
					// console.log("new user yes");
					// console.log("new user db",dbUsers[j].netid);
					// console.log("new user socket", socketUsers[i].netid);
					if (dbUsers[j].netid == socketUsers[i].netid) {
						shouldAdd = false;
						dbUsers.splice(j,1); //Removing single user						
						console.log("yes");
						break;
					}
				}else{
					// console.log("new user no");
					// console.log("new user db",dbUsers[j].netid);
					// console.log("new user socket", socketUsers[i].netid);
					if (dbUsers[j].netid == socketUsers[i].netid) {
						dbUsers[j].socketId = socketUsers[i].socketId;
						shouldAdd = true;
						console.log("no");
						break;
			       }
				}
			}
			// if(!shouldAdd){				
			// 	tempUsers.push(socketUsers[i]);
			// 	console.log("pushed", socketUsers[i]);
			// }
		}
		if(newUsers=='no'){
			tempUsers = tempUsers.concat(dbUsers);
			// console.log("last no dbUsers", dbUsers);
			// console.log("last no tempUsers", tempUsers);
		}else{
			tempUsers = dbUsers;
			// console.log("direct db to temp", tempUsers);
		}
		// console.log("merge users");
		callback(tempUsers);
	}
}
module.exports = self;