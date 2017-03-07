var mongoose = require('mongoose');

// Question Schema
var questionSchema = mongoose.Schema({
	question: String,
	answer: String,
	name: String,
	credential: String,
	commentername: String,
	comment: String,
	hashtag: String,	
});

var Question = module.exports = mongoose.model('Question', questionSchema);

// Get Questions
module.exports.getQuestions = function(callback, limit){
	Question.find(callback).limit(limit);
}

// Add Question
module.exports.addQuestion = function(question, callback){
	question.answer = " ";
	Question.create(question, callback);
}