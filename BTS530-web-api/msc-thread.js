const { ObjectId } = require('mongoose');
// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Associated or related schema(s)
var Post = require('./msc-threadPost');

// Entity schema
var threadSchema = new Schema({
    subject: String,
    content: String,
    dateCreated: Date,
    author: String,
    like: Number,
    dislikes: Number,
    posts: [Post]
});

// Make schema available to the application
module.exports = threadSchema;