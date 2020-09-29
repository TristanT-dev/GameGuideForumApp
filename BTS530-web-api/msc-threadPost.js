
const { ObjectId } = require('mongoose');
// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema
var threadPostSchema = new Schema({
    content: String,
    dateCreated: Date,
    author: String,
    likes: Number,
    dislikes: Number
});

// Make schema available to the application
module.exports = threadPostSchema;