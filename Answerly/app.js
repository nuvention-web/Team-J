var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


Question = require('./models/question');
Answer = require('./models/answers');
Comment = require('./models/comments');

// Connect to Mongoose
mongoose.connect('mongodb://aagam:hellsniper1210@ds157479.mlab.com:57479/question_feed');
var db = mongoose.connection;

app.get('/api/questions', function(req, res){
	Question.getQuestions(function(err, questions){
		if(err){
			throw err;
		}
		res.json(questions);
	});
});


app.post('/api/answers', function(req, res){
	var ans = req.body;
	Answer.addQuestion(ans, function(err, ans){
		if(err){
			throw err;
		}
		res.json(ans);
	});
});

app.get('/api/answers', function(req, res){
	var ans = req.body;
	Answer.addAnswers(ans, function(err, ans){
		if(err){
			throw err;
		}
		res.json(ans);
	});
});

app.post('/api/questions', function(req, res){
	var com = req.body;
	Comment.addComments(com, function(err, com){
		if(err){
			throw err;
		}
		res.json(com);
	});
});

app.listen(80);
console.log('Running on port 80...');