/*requiring node modules starts */

var bodyParser = require('body-parser');

/*requiring node modules starts */

var method=routes.prototype;

var url = require('url');

/*Telling Multer where to upload files*/

function routes(app,connection,sessionInfo){
	
	var file_path="";
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	/*
		get to handle add class page
	*/	
	app.get('/', function(req, res){
		
		sessionInfo=req.session;
		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			res.redirect('/course_list.html#/'+sessionInfo.uid);
		}else{
			res.render('description');		
		}
	});


	/*
		get to handle add class page
	*/	

	app.post('/rateCourse', function(req, res){


		sessionInfo=req.session;

		var rateNetID=req.body.myNetID;
		var rateCourseNum=req.body.myCourseNum;
		var rateCourseTerm=req.body.myCourseTerm;

		var rateRate=req.body.myRate;
		var raterDifficulty=req.body.myrDifficulty;
		var raterEffectiveness=req.body.myrEffectiveness;

		var rateNumofRates = req.body.myNumofRates;
		var rateAverageRate = req.body.myAverageRate;
		var rateAverageDifficulty = req.body.myAverageDifficulty;
		var rateAverageEffectiveness = req.body.myAverageEffectiveness;
		var rateOurNum = req.body.myOurNum;

		var rateReview = req.body.myReview;

		var rateFlag = req.body.myFlag;

		// console.log(rateReview);

		var data={
			query:"update course_taken set rating = '"+ rateRate + "', review = '"+ rateReview + "', rDifficulty='"+ raterDifficulty + "', rEffectiveness='"+ raterEffectiveness + "' where netid=\"" + rateNetID + "\" and class_num='" + rateCourseNum + "' and term='" + rateCourseTerm + "';",
			connection:connection
		}

		query_runner(data,function(result){

			// console.log(result);
			if(result.changedRows>0) {

				var uid = "";
				sessionInfo.uid = rateNetID;

				var update_rating={
					query:"update course set rating = '"+ rateAverageRate + "', difficulty = '"+ rateAverageDifficulty + "', effectiveness = '"+ rateAverageEffectiveness + "', no_of_students = '"+ rateNumofRates +"', our_num = '"+ rateOurNum +"' where class_num='" + rateCourseNum + "' and term='" + rateCourseTerm + "'",
					connection:connection
				}
				query_runner(update_rating,function(result_online){

					// console.log(result_online);
					if(result_online.changedRows>0 && rateFlag == false) {

						var update_student={
							query:"update student set points = points + 10 where netid=\"" + rateNetID + "\"",
							connection:connection
						}

						query_runner(update_student,function(result_student){

							if (result_student.changedRows > 0){
								result_send={
						    		is_logged:true,
						    		id:uid,
						    		msg:"OK"
			    				};	
							}
							else{
								result_send={
					    			is_logged:false,
					    			id:null,
					    			msg:"BAD"
		    					};
							}
						});



						result_send={
				    		is_logged:true,
				    		id:uid,
				    		msg:"OK"
			    		};	
					}
					else{
						result_send={
			    			is_logged:false,
			    			id:null,
			    			msg:"BAD"
		    			};
					}
				});	

				result_send={
			    		is_logged:true,
			    		id:uid,
			    		msg:"OK"
			    };	    	
		    } else {
		    	result_send={
		    		is_logged:false,
		    		id:null,
		    		msg:"BAD"
		    	};
		    }
		    /*
				Sending response to client
			*/
		    res.write(JSON.stringify(result_send));
			res.end();
		});
	});

	/*
		get to handle add class page
	*/	
	app.get('/courselist', function(req, res){
		
		sessionInfo=req.session;
		
		var parts = url.parse(req.url, true);
		var query = parts.query;
		// var term = req;
		// console.log(query.term);

		var term = query.term;

		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			
			var data={
				query:"select * from course where term='"+term+"' order by course_id,title",
				connection:connection
			}

			query_runner(data,function(result){
				if(result.length>0) {
					res.json(result);
		    	} else {
		    		console.log("None");
		    	}			
			});
		}else{
			
			res.send("Not login");	
		}
	});

	app.get('/courseDetail', function(req, res){
		
		sessionInfo=req.session;
		
		var parts = url.parse(req.url, true);
		var query = parts.query;
		// var term = req;
		// console.log(sessionInfo.uid);
		var num = query.courseNum;
		var term = query.courseQuarter;

		// console.log(query, num, term);
		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			
			var data={
				query:"select * from course where term='"+term+"' and class_num= '"+num+"';",
				connection:connection
			}

			// console.log(data.query);

			query_runner(data,function(result){

				// console.log(result);
				if(result.length>0) {
					res.json(result);
		    	} else {
		    		// console.log("None");
		    		res.send("No course found");
		    	}			
			});
		}else{		
			res.send("Not login");
		}
	});


	app.get('/raterlist', function(req, res){
		
		sessionInfo=req.session;
		
		var parts = url.parse(req.url, true);
		var query = parts.query;

		var courseNum = query.courseNum;
		var courseTerm = query.courseQuarter;

		// console.log(sessionInfo.uid);

		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			
			var data={
				query:"select s.first_name, s.netid, s.p_photo, s.online, ct.rating, ct.rDifficulty, ct.rEffectiveness, ct.review from course_taken as ct, student as s where ct.term=\""+courseTerm+"\" and ct.class_num = \"" + courseNum + "\" and s.netid = ct.netid and ct.rating != 0 and ct.netid != '" + sessionInfo.uid + "' order by rating desc",
				connection:connection
			}

			query_runner(data,function(result){
				// console.log(result);
				if(result.length>0) {
					res.json(result);
		    	} else {
		    		res.send("No one rated");
		    	}			
			});
		}else{
			// var data={
			// 	query:"select s.first_name, s.netid, s.p_photo, s.online, ct.rating, ct.rDifficulty, ct.rEffectiveness, ct.review from course_taken as ct, student as s where ct.term=\""+courseTerm+"\" and ct.class_num = \"" + courseNum + "\" and s.netid = ct.netid and ct.rating != 0 and ct.netid != '" + sessionInfo.uid + "' order by rating",
			// 	connection:connection
			// }

			// query_runner(data,function(result){
			// 	// console.log(result);
			// 	if(result.length>0) {
			// 		res.json(result);
		 //    	} else {
		 //    		console.log("None");
		 //    	}			
			// });	
			res.send("Not login");	
		}
	});

	/*
		handle session request
	*/	
	app.get('/get_user_id', function(req, res){
		
		sessionInfo=req.session;

		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			console.log("in get user",sessionInfo.uid);
			res.send(sessionInfo.uid);

		}else{
			
			res.send("None");
		}
	});


	/*
		get to handle add class page
	*/	
	app.get('/main', function(req, res){
		
		sessionInfo=req.session;
		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			res.send('success');
		}else{
			res.send('Not login');		
		}
	});	


	app.get('/profile', function(req, res){
		
		sessionInfo=req.session;
		// console.log(sessionInfo, sessionInfo.uid);

		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			var data={
				query:"select * from student where netid='" + sessionInfo.uid + "'",
				connection:connection
			}

			query_runner(data,function(result){
				// console.log(result);
				if(result.length>0) {
					res.json(result);
		    	} else {
		    		console.log("None");
		    	}			
			});
		}else{
			res.send('Not login');		
		}
	});

	app.get('/taken_Course', function(req, res){
		// console.log("111");
		sessionInfo=req.session;
		// console.log(sessionInfo);

		/*Render Login page If session is not set*/

		// console.log(sessionInfo.uid);
		if(sessionInfo.uid){
			var data={
				query:"select ct.netid, ct.review, ct.rating as myRate, ct.rDifficulty as rDifficulty, ct.rEffectiveness as rEffectiveness, c.* from course_taken as ct, course as c where ct.netid='" + sessionInfo.uid + "' and ct.class_num = c.class_num and ct.term = c.term",
				connection:connection
			}

			query_runner(data,function(result){
				// console.log(result);
				if(result.length>0) {
					res.json(result);
		    	} else {
		    		console.log("None");
		    	}			
			});
		}else{
			res.render('chat_login');		
		}
	});

}

method.getroutes=function(){
	return this;
}

module.exports = routes;

var query_runner=function(data,callback){
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
}