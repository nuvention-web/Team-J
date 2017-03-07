var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var port = process.env.PORT || 8080;
var xoauth2 = require('xoauth2');
var helper = require('sendgrid').mail;

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


Question = require('./models/question');
Answer = require('./models/answers');
Comment = require('./models/comments');

// Connect to Mongoose
mongoose.connect('mongodb://aagam:hellsniper1210@ds157479.mlab.com:57479/question_feed');
var db = mongoose.connection;

//Listen to any port assigned by Heroku
app.listen(port, function() {
	console.log('Answerly is running on http://localhost:' + port);
});

app.get('/api/questions', function(req, res){
	Question.getQuestions(function(err, questions){
		if(err){
			throw err;
		}
		res.json(questions);
	});
});


// app.post('/api/answers', function(req, res){
// 	var ans = req.body;
// 	Answer.addQuestion(ans, function(err, ans){
// 		if(err){
// 			throw err;
// 		}
// 		res.json(ans);
// 	});
// });

// app.get('/api/answers', function(req, res){
// 	var ans = req.body;
// 	Answer.addAnswers(ans, function(err, ans){
// 		if(err){
// 			throw err;
// 		}
// 		res.json(ans);
// 	});
// });

app.post('/api/questions/', function(req, res){
	var com = req.body;
	console.log(com);
	Question.addQuestion(com, function(err, com){
		if(err){
			throw err;
		}
		res.json(com);
	});
});

app.post('/api/questions/email', function(req, res, next){
	console.log(req.body);
	console.log(req.followup);

	// from_email = new helper.Email("aagamshah2017@u.northwestern.edu");
	// to_email = new helper.Email("aagam.shah1210@gmail.com");
	// subject = "Sending with SendGrid is Fun";
	// content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js");
	// mail = new helper.Mail(from_email, subject, to_email, content);

	var mail_body = "<h2>"+req.body.question+"</h2><h3><u> Your Answer : <u></h3><h3>"+req.body.answer+"</h3><h3><u> Follow up question : <u></h3><h3>"+req.param('fques')+"</h3>";

	var sg = require('sendgrid')('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');
	var request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: {
	    personalizations: [
	      {
	        to: [
	          {
	            email: 'aagamshah2017@u.northwestern.edu',
	          },
	        ],
	        subject: 'Follow up requested for a question',
	      },
	    ],
	    from: {
	      email: 'team.answerly@gmail.com',
	    },
	    content: [
	      {
	        type: 'text/html',
	        value: mail_body,
	      },
	    ],
	  },
	});

	//With promise
	sg.API(request)
	  .then(response => {
	    console.log(response.statusCode);
	    console.log(response.body);
	    console.log(response.headers);
	  })
	  .catch(error => {
	    //error is an instance of SendGridError
	    //The full response is attached to error.response
	    console.log(error.response.statusCode);
	  });

	//With callback
	sg.API(request, function(error, response) {
	  if (error) {
	    console.log('Error response received');
	  }
	  console.log(response.statusCode);
	  console.log(response.body);
	  console.log(response.headers);
	});

	// var sg = require('sendgrid')('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');
	// var request = sg.emptyRequest({
	//   method: 'POST',
	//   path: '/v3/mail/send',
	//   body: mail.toJSON()
	// });

	// sg.API(request, function(error, response) {
	//   console.log(response.statusCode);
	//   console.log(response.body);
	//   console.log(response.headers);
	//   console.log(error);
	// });
	
	res.json();
});

  


// var transporter = nodemailer.createTransport('SMTP',{
// 		service: 'gmail',
// 		auth: {
// 			// user: 'team.answerly@gmail.com',
// 			// pass: 'NUanswerly2017',
// 			xoauth2: xoauth2.createXOAuth2Generator({
// 				user: 'team.answerly@gmail.com',
// 				// pass: 'NUanswerly2017',
// 				clientId: '159734538542-31s80fi0qg7e7l6053v0r3329jn4dujn.apps.googleusercontent.com',
// 				clientSecret: '51GeKjBVvBTVgwW95Eaf6WiJ',
// 				refreshToken: '1/VoUuC1fpugquxYbesH6K64kQW_w87u9AXjYmEXH4tHw',
// 			})
// 		}
// 	});

// 	var mailOptions = {
// 		from: 'Answerly <team.answerly@gmail.com>',
// 		to: 'aagam.shah1210@gmail.com',
// 		subject: 'Hi',
// 		text: 'This is a test mail'
// 	}

// 	transporter.sendMail(mailOptions, function(error, info){
// 		if(error){
// 			console.log(error);
// 		} else {
// 			console.log('Message sent');
// 		}
// 	})