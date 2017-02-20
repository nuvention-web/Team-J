var mongoose = require('mongoose');

// Question Schema
var questionSchema = mongoose.Schema({
	question:{
		type: String	
	}

});

var Question = module.exports = mongoose.model('Question', questionSchema);

// Get Questions
module.exports.getQuestions = function(callback, limit){
	Question.find(callback).limit(limit);
}

// Add Question
module.exports.addQuestion = function(question, callback){
	Question.create(question, callback);
}