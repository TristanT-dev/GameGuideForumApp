// Setup
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Associated or related schema(s)
var GuideComment = require('./msc-guideComment');

// Entity schema
var gameGuideSchema = new Schema({
    fullTitle: String,
    shortTitle: String,
    languageCode: String,
    category: String,
    patch: String,
    keywords: [String],
    votes: [Number],
    rating: Number,
    description: String,
    content: String,
    status: String,
    linkYouTube: String,
    images: [String],
    author: String,
    dateCreated: Date,
    dateUpdated: Date,
    comments: [GuideComment]
});

// Make schema available to the application
module.exports = gameGuideSchema;