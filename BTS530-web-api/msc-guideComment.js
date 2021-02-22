const { ObjectId } = require('mongoose');
// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema
var guideCommentSchema = new Schema({
    comment: String,
    dateCreated: Date,
    author: String,
});

// Make schema available to the application
module.exports = guideCommentSchema;