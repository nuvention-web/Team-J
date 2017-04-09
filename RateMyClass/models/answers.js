var mongoose = require('mongoose');

// Answers Schema
var answersSchema = mongoose.Schema({
	qid: {type: String},
	answwers: {type: String},
});

var Answers = module.exports = mongoose.model('Answers', answersSchema);

// Get Answers
module.exports.getAnswers = function(callback, limit){
	Answers.find(callback).limit(limit);
}

// Add Answer
module.exports.addAnswers = function(answers, callback){
	Answers.create(answers, callback);
}