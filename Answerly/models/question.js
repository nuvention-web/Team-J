var mongoose = require('mongoose');

// Question Schema
var questionSchema = mongoose.Schema({
	question: String,
	answer: String,
	name: String,
	credential: String,
	commentername: String,
	comment: String,
	hashtag: {type: String,	default: "Prof.BarryNelson" }
});

var Question = module.exports = mongoose.model('Question', questionSchema);

// Get Questions
module.exports.getQuestions = function(callback, limit){
	Question.find(callback).limit(limit);
}

// Add Question
module.exports.addQuestion = function(question, profhash, callback){
	question.hashtag = profhash;
	console.log("in model"+question.hashtag);
	Question.create(question, callback);
}