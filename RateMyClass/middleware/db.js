/*requiring mysql node modules */
var mysql = require("mysql");

var method = db.prototype;

function db() {
	/*
		creating MySql database connection 
	*/
	var con = mysql.createPool({
		host : '104.154.238.3',
		user : 'root',
	  	password : 'root',
	  	database : 'coeva'
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
