/*requiring node modules starts */

var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');
var https = require('https');
var request = require('request');
var xml2js = require('xml2js');
/*requiring node modules starts */


/*Telling Multer where to upload files*/
var upload = multer({ dest: 'uploads' });


var method=routes.prototype;

function routes(app,connection,sessionInfo){
	
	var file_path="";
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	
	app.get('/login', function(req, res){
		
		sessionInfo=req.session;
		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			res.redirect('/main.html#?id='+sessionInfo.uid);
		}else{
			res.render('chat_login');		
		}
	});

	/*
		post to handle Login request
	*/
	app.post('/login', function(req, res){


		sessionInfo=req.session;

		username=req.body.username;
		password=req.body.password;

		var data={
			query:"select * from student where password='"+password+"' and netid='"+username+"' ",
			connection:connection
		}
		/*
			Calling query_runner to run  SQL Query
		*/
		query_runner(data,function(result){
			var uid="";			
			result.forEach(function(element, index, array){
				uid=element.id;
			});

			if(result.length>0) {

				//setting session
				sessionInfo.uid = uid;

				var set_online={
					query:"update student set online='Y' where netid='"+username+"'",
					connection:connection
				}
				query_runner(set_online,function(result_online){});	
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
		post to handle username availability request
	*/
	app.post('/check_name', function(req, res){
		username=req.body.username;		
		var data={
			query:"select * from student where netid='"+username+"'",
			connection:connection
		}
		query_runner(data,function(result){
			
			if(result.length>0) {
		    	result_send={
		    		msg:true
		    	};
		    } else {
		    	result_send={
		    		msg:false
		    	};
		    } 
		    res.write(JSON.stringify(result_send));
			res.end();
		});
	});

	/*
		post to Register username request
	*/
	app.post('/register', upload.single('file'), function(req, res, next){

		sessionInfo=req.session;

		/*
			using NU directory service to access student contact data
		*/
		var terms = [4640,4650,4660];
		var result_send = {};
		var firstname = "";
		var lastname = "";

		check_NetID(req, res, connection, function(){
			res.write(JSON.stringify(result_send));
			res.end();
		});
		
		
	});

	/*
		post to handle Logout request
	*/
	

}

method.getroutes=function(){
	return this;
}

module.exports = routes;

/*
	Making query_runner function to Run mysl queries
*/
var query_runner=function(data,callback){
	var db_connection=data.connection;
	var query=data.query;
	var insert_data=data.insert_data;
	db_connection.getConnection(function(err,con){
		if(err){
		  con.release();
		}else{
			db_connection.query(String(query),insert_data,function(err,rows){
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


var get_courses=function(netid, connection, callback){
	var count = 0;
	var terms = [4640,4650,4660];
	var term_names = ['2016 Fall','2017 Winter','2017 Spring'];
	var courses = [];
	for (var t=0;t<terms.length;t++){
		(function(term_id){
			var url_course = 'https://nusoaqa.northwestern.edu/NW_SR_CLASS_LIST_R/Request/STUDENT/'+netid+'/'+terms[term_id];
			request.get(url_course, {
				auth: {
					'user': 'eecs473-coeva-soa',
					'pass': 'dQWSGYeyHGNWxErnBOaRxgo2tcWeHG'
				}
			}, function(error, response, body, t){
				if (error == null){
					var parser = new xml2js.Parser();
					parser.parseString(body, function(err, result){
						var classes = result['NW_SR_CLASS_LIST_GET_RESP']['CLASS'];
						for(i=0;i<classes.length;i++){
							if(classes[i]['SSR_COMPONENT']!='DIS'){
								courses.push(term_names[term_id]);
								courses.push(classes[i]['CLASS_NBR'][0]);
							}
						}
					});
					if(++count == terms.length){
						insert_courses(netid, courses, connection, callback);
					}
				}
				else{
					console.log(error);
					//callback(error);
					return
				}
			});
		})(t);
	}
}


var check_NetID=function(req, res, connection, callback){

	var url_directory = 'https://nusoaqa.northwestern.edu/DirectorySearch/res/netid/pub/' + req.body.username;
	request.get(url_directory, {
			auth: {
					'user': 'eecs473-coeva-soa',
					'pass': 'dQWSGYeyHGNWxErnBOaRxgo2tcWeHG'
			}
		}, function(error, response,body){
			if (!JSON.parse(body).hasOwnProperty("errorCode")){
				var result = JSON.parse(body).results[0];
				var email = result['mail'];
				var firstname = result['givenName'][0];
				var lastname = result['sn'][0];

				var fullname = result['displayName'][0];

				console.log(result);
				if(email.includes("@u.")){
					console.log("Student");
					insert_user(req, firstname, lastname, email, connection,callback);
				}
				else{
					res.send("Not a student");
					console.log("Not a student");
				}
			}
			else{
				res.send("No record found");
				console.log("No record found");
			}
	});
}


var insert_user=function(req, firstname, lastname, email, connection,callback){
	var insert_data = {
			netid:req.body.username,
			first_name:firstname,
			last_name:lastname,
			password:req.body.password,
			email_id:email,
			points:30,
			p_photo:null,
			timestamp:Math.floor(new Date() / 1000),
			online:'Y'
		};

	var data={
		query:"INSERT INTO student SET ?",
		connection:connection,
		insert_data:insert_data
	};	
	query_runner(data,function(result){
		//storing session ID
		// sessionInfo.uid = result.insertId;

		if(result) {
			result_send={
	    		is_logged:true,
	    		id:result.insertId,
	    		msg:"OK"
	    	};
	    	get_courses(req.body.username, connection, callback);
		}else{
			result_send={
	    		is_logged:false,
	    		id:null,
	    		msg:"BAD"
	    	};
		}	
	});
}

var insert_courses=function(netid, courses, connection, callback){
	var course_list = [];
	for(var n = 0; n < courses.length; n = n+2){
		course_list.push([netid,parseInt(courses[n+1]),courses[n],0]);
	}
	var data={
		query:"INSERT INTO course_taken (`netid`,`class_num`,`term`,`rating`) VALUES ?",
		connection:connection,
		insert_data:[course_list]
	};		
	query_runner(data,function(result){
		//storing session ID
		// sessionInfo.uid = result.insertId;

		if(result) {
			result_send={
	    		is_logged:true,
	    		id:result.insertId,
	    		msg:"OK"
	    	};
	    	callback();
		}else{
			result_send={
	    		is_logged:false,
	    		id:null,
	    		msg:"BAD"
	    	};
	    	console.log("Error in adding course");
		}		
	});		
}