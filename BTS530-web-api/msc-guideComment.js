const { ObjectId } = require('mongoose');
// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema
var guideCommentSchema = new Schema({
    content: String,
    dateCreated: Date,
    author: String,
    like: Number,
    dislikes: Number
});

// Make schema available to the application
module.exports = guideCommentSchema;