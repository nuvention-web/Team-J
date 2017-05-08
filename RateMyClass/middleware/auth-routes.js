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
			res.redirect('/main#?id='+sessionInfo.uid);
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
		var	username = "eecs473-coeva-soa";
		var password = "dQWSGYeyHGNWxErnBOaRxgo2tcWeHG";
		var terms = [4640,4650,4660];
		
		// var firstname = "";
		// var lastname = "";
		

		check_NetID(function(firstname, lastname){


			console.log("insert", firstname, lastname);

			var insert_data = {

					netid:req.body.username,
					first_name:firstname,
					last_name:lastname,
					password:req.body.password,
					points:0,
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
				sessionInfo.uid = result.insertId;

				if(result) {
					result_send={
			    		is_logged:true,
			    		id:result.insertId,
			    		msg:"OK"
			    	};
				}else{
					result_send={
			    		is_logged:false,
			    		id:null,
			    		msg:"BAD"
			    	};
				}
				res.write(JSON.stringify(result_send));
				res.end();		
			});	
			
		});


		/*
			using NU enrollment service to access student course data
		*/
		// console.log("before class");
		// var class_numbers = [];

		// get_courses(class_numbers,function(output){
		// 	if(output == null){
		// 		console.log(class_numbers);
		// 	}
		// 	else{
		// 		console.log("sorry");
		// 	}
		// });
		
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


var get_courses=function(courses, callback){
	var count = 0;
	var terms = [4640,4650,4660];
	for (var t=0;t<terms.length;t++){
		var url_course = 'https://nusoaqa.northwestern.edu/NW_SR_CLASS_LIST_R/Request/STUDENT/ads9122/'+terms[t];
			// console.log(courses[t]);
			request.get(url_course, {
				auth: {
					'user': 'eecs473-coeva-soa',
					'pass': 'dQWSGYeyHGNWxErnBOaRxgo2tcWeHG'
				}
			}, function(error, response,body){
				if (error == null){
					var parser = new xml2js.Parser();
					parser.parseString(body, function(err, result){
						var classes = result['NW_SR_CLASS_LIST_GET_RESP']['CLASS'];
						for(i=0;i<classes.length;i++){
							courses.push(classes[i]['CLASS_NBR'][0]);
							// console.log("class");
							// console.log(courses[i]);
						}
					});
					if(++count == terms.length){
						callback();
					}
				}
				else{
					console.log(error);
					callback(error);
					return
				}
			});
	}
}


var check_NetID=function(callback){

	var url_directory = 'https://nusoaqa.northwestern.edu/DirectorySearch/res/netid/pub/ads9122';
	request.get(url_directory, {
			auth: {
					'user': 'eecs473-coeva-soa',
					'pass': 'dQWSGYeyHGNWxErnBOaRxgo2tcWeHG'
			}
		}, function(error, response,body){
			console.log(error);
			if (error == null){
				var result = JSON.parse(body).results[0];
				console.log(result);
				var email = result['mail'];
				var firstname = result['givenName'][0];
				var lastname = result['sn'][0];

				console.log(firstname, lastname, result['givenName'][0], result['sn'][0]);
				var fullname = result['displayName'][0];
				if(email.includes("@u.")){
					console.log("Student");
					callback(firstname, lastname);
				}
				else{
					res.send("Not a student");
					console.log("Not a student");
				}
			}
			else if(error.code == '404'){
				res.send("No record found");
				console.log("No record found");
			}
			else{
				// res.send(error);
				console.log(error);
			}
	});
}





