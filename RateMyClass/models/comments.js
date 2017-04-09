var mongoose = require('mongoose');

// Comments Schema
var commentsSchema = mongoose.Schema({
	comments:{
		type: String	
	}

});

var Comments = module.exports = mongoose.model('Comments', commentsSchema);

// Get Comments
module.exports.getComments = function(callback, limit){
	Comments.find(callback).limit(limit);
}

// Add Comments
module.exports.addComments = function(comments, callback){
	Comments.create(comments, callback);
}