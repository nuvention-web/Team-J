/*requiring node modules starts */

var bodyParser = require('body-parser');

/*requiring node modules starts */

var method=routes.prototype;

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
			res.render('chat_login');		
		}
	});


	/*
		get to handle add class page
	*/	
	app.get('/addclass', function(req, res){
		
		sessionInfo=req.session;
		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			res.redirect('/adding_class#?id='+sessionInfo.uid);
		}else{
			res.render('chat_login');		
		}
	});

	/*
		get to handle add class page
	*/	
	app.get('/courselist', function(req, res){
		
		sessionInfo=req.session;

		var data={
				query:"select * from course where term='2016 Fall'",
				connection:connection
			}

			query_runner(data,function(result){
				if(result.length>0) {
					var courses="";
					console.log(result);
					res.render('/course_list#?id='+sessionInfo.uid,{data:JSON.stringify});
		    	} else {
		    		console.log("None");
		    	}			
			});

		console.log(data);
		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			
			res.redirect('/course_list#?id='+sessionInfo.uid);

		}else{
			res.render('chat_login');		
		}
	});	

	/*
		get to handle add class page
	*/	
	app.get('/main', function(req, res){
		
		sessionInfo=req.session;
		/*Render Login page If session is not set*/
		if(sessionInfo.uid){
			res.redirect('/main#?id='+sessionInfo.uid);
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