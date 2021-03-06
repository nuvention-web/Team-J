var express = require("express");
var path= require('path'); 
 
var method=config.prototype;

function config(app){
	
	// Setting .html as the default template extension
	app.set('view engine', 'html');

	// Initializing the ejs template engine
	app.engine('html', require('ejs').renderFile);

	// Telling express where it can find the templates
	// app.set('views', (__dirname + '/../client'));

	//Files 
	app.use(express.static(path.join(__dirname,'../views'),{ redirect : false }));
}

method.get_config=function(){
	return this;
}

module.exports = config;

