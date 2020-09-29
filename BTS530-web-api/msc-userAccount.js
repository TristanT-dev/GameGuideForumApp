var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema
var userAccountSchema = new Schema({
    userName: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,
    role : String,
    dateCreated: Date
});

// Make schema available to the application

module.exports = userAccountSchema;