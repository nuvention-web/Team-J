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