/*requiring mysql node modules */
var mysql = require("mysql");

var method = db.prototype;

function db() {
	/*
		creating MySql database connection 
	*/
	var con = mysql.createPool({
		host : 'localhost',
		user : 'root',
	  	password : 'admin123',
	  	database : 'chat'
	 //  	host : '104.198.29.13',
	 //     port: '3306',
	 //  	user : 'root',
	 //  	password : 'root',
	 //  	database : 'coeva'
	});
	this.connection=con;
}
method.getcon = function() {
	return this;
};

module.exports = db;
