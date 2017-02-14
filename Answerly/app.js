var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


Question = require('./models/question');

// Connect to Mongoose
mongoose.connect('mongodb://aagam:hellsniper1210@ds151909.mlab.com:51909/question');
var db = mongoose.connection;

app.get('/api/questions', function(req, res){
	Question.getQuestions(function(err, questions){
		if(err){
			throw err;
		}
		res.json(questions);
	});
});


app.post('/api/questions', function(req, res){
	var question = req.body;
	Question.addQuestion(question, function(err, question){
		if(err){
			throw err;
		}
		res.json(question);
	});
});


app.listen(3000);
console.log('Running on port 3000...');