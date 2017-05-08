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
			res.redirect('/main#?id='+sessionInfo.uid);
		}else{
			res.render('description');		
		}
	});


	/*
		get to handle add class page
	*/	
	app.post('/update_rate', function(req, res){


		sessionInfo=req.session;

		username=req.body.username;
		password=req.body.password;

		var data={
			query:"update course_taken set rating='5' where netid='ads9122' and classnum='32185' and term='2017 Spring'",
			connection:connection
		}
		/*
			Calling query_runner to run  SQL Query
		*/
		query_runner(data,function(result){

			console.log();
			if(result.length>0) {

				var update_rating={
					query:"update course set online='Y' where netid='"+username+"'",
					connection:connection
				}
				query_runner(update_rating,function(result_online){});	
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

	app.post('/rateCourse', function(req, res){


		sessionInfo=req.session;

		var rateNetID=req.body.myNetID;
		var rateCourseNum=req.body.myCourseNum;
		var rateCourseTerm=req.body.myCourseTerm;
		var rateRate=req.body.myRate;
		console.log(rateNetID, rateCourseNum, rateCourseTerm, rateRate);

		var data={
			query:"update course_taken set rating=\"" + rateRate + "\" where netid=\"" + rateNetID + "\" and class_num=\"" + rateCourseNum + "\" and term=\"" + rateCourseTerm + "\"",
			connection:connection
		}

		query_runner(data,function(result){

			if(result.length>0) {

				var update_rating={
					query:"update course set online='Y' where netid='"+rateNetID+"'",
					connection:connection
				}
				query_runner(update_rating,function(result_online){});	
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
		console.log(query.term);

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
		}
	});


	app.get('/raterlist', function(req, res){
		
		sessionInfo=req.session;
		
		var parts = url.parse(req.url, true);
		var query = parts.query;

		var courseNum = query.courseNum;
		var courseTerm = query.courseQuarter;

		console.log(courseNum, courseTerm);

		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			
			var data={
				query:"select * from course_taken as ct, student as s where ct.term=\""+courseTerm+"\" and ct.class_num = \"" + courseNum + "\" and s.netid = ct.netid order by rating",
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
			var data={
				query:"select * from course_taken as ct, student as s where ct.term=\""+courseTerm+"\" and ct.class_num = \"" + courseNum + "\" and s.netid = ct.netid order by rating",
				connection:connection
			}

			query_runner(data,function(result){
				if(result.length>0) {
					res.json(result);
		    	} else {
		    		console.log("None");
		    	}			
			});		
		}
	});

	/*
		handle session request
	*/	
	app.get('/get_user_id', function(req, res){
		
		sessionInfo=req.session;

		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			
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
			res.render('main');
		}else{
			res.render('chat_login');		
		}
	});	


	app.get('/profile', function(req, res){
		
		sessionInfo=req.session;
		// console.log(sessionInfo);

		/*Render Login page If session is not set*/
		if(!sessionInfo.uid){
			var data={
				query:"select * from student where netid='ysa6698'",
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
			res.render('chat_login');		
		}
	});

	app.get('/taken_Course', function(req, res){
		
		sessionInfo=req.session;
		// console.log(sessionInfo);

		/*Render Login page If session is not set*/
		if(!sessionInfo.uid){
			var data={
				query:"select ct.netid, ct.rating as myRate, c.* from course_taken as ct, course as c where ct.netid=\"ysa6698\" and ct.class_num = c.class_num and ct.term = c.term",
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
			res.render('chat_login');		
		}
	});

	app.get('/profile.data', function(req, res){
		
		sessionInfo=req.session;
		// console.log(sessionInfo);

		/*Render Login page If session is not set*/
		if(!sessionInfo.uid){
			res.render('profile');
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