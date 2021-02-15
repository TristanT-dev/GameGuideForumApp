
// ################################################################################
// Data service operations setup

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Load the schemas...

// Data entities; the standard format is:
const gameGuideSchema = require('./msc-gameGuide');
const guideCommentSchema = require('./msc-guideComment');
const threadSchema = require('./msc-thread');
const threadPostSchema = require('./msc-threadPost');
const userAccountSchema = require('./msc-userAccount');

// ################################################################################
// Define the functions that can be called by server.js

module.exports = function () {

    // Collection properties, which get their values upon connecting to the database
    let GameGuide;
    let GuideComment;
    let ForumThread;
    let ForumPost;
    let UserAccount;
  
    return {
  
      // ############################################################
      // Connect to the database
  
      connect: function () {
        return new Promise(function (resolve, reject) {
  
          // Create connection to the database
          console.log('Attempting to connect to the database...');
  
          // The following works for localhost...
          // Replace the database name with your own value
          mongoose.connect('mongodb+srv://dbUser:senecabts530!@bts530.ld4au.mongodb.net/GameWebsite?retryWrites=true&w=majority', { connectTimeoutMS: 5000, useUnifiedTopology: true });

          // From https://mongoosejs.com/docs/connections.html
          // Mongoose creates a default connection when you call mongoose.connect(). 
          // You can access the default connection using mongoose.connection.
          var db = mongoose.connection;
  
          // Handle connection events...
          // https://mongoosejs.com/docs/connections.html#connection-events
          // The data type of a connection event is string
          // And more than one connection event may be emitted during execution
  
          // FYI the Node.js EventEmitter class docs is here...
          // https://nodejs.org/api/events.html#events_class_eventemitter
  
          // Handle the unable to connect scenario
          // "on" is a Node.js method in the EventEmitter class
          // https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
          db.on('error', (error) => {
            console.log('Connection error:', error.message);
            reject(error);
          });
  
          // Handle the open/connected event scenario
          // "once" is a Node.js method in the EventEmitter class
          // https://nodejs.org/api/events.html#events_emitter_once_eventname_listener
          db.once('open', () => {
            console.log('Connection to the database was successful');
            GameGuide = db.model("gameGuides", gameGuideSchema, "gameGuides");
            ForumThread = db.model("forumThreads", threadSchema, "forumThreads");
            UserAccount = db.model("userAccounts", userAccountSchema, "userAccounts");
           
            resolve();
          });
        });
      },



      // userAccount requests ************************************************************

      // register a new user account

      userAccountsRegister: function (newAccount) {
        return new Promise(function (resolve, reject) {
            
            let date = new Date();
            newAccount.dateCreated = date;

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(newAccount.password, salt);
            
            newAccount.password = hash;
            console.log(newAccount.username);
            UserAccount.create(newAccount, (error, Account) => {
                if(error) {
                    // Cannot add item
                    return reject(error.message);
                }
                //Added object will be returned
                return resolve(Account);
            });

        });
      },

      // login a user account

      userAccountsLogin: function (credentials) {
        return new Promise((resolve, reject) => {
          
          UserAccount.findOne({username: credentials.username})
            .exec((error, result) => {
              if(result){
                let isPasswordMatch = bcrypt.compareSync(credentials.password, result.password);
                if(isPasswordMatch){
                  return resolve(result);
                }else{
                  return reject(false);
                }
              }else{
                return reject(false);
              }
            });
          });
      },

      


      // gameGuide requests **************************************************************

      // get all (sorted)

      gameGuideGetAll: function () {
        return new Promise((resolve, reject) => {
        
          GameGuide.find()
            .sort({ rating: 'asc' })
            .exec((error, guides) => {
              if (error) {
                // Query error
                return reject(error.message);
              }
              // Found, a collection will be returned
              return resolve(guides);
            });
        });
      },

       // get one, by object identifier

      gameGuideGetById: function (gameGuideId) {
          return new Promise(function (resolve, reject) {
    
            // Find one specific document
            GameGuide.findById(gameGuideId)
              .exec((error, guide) => {
                if (error) {
                  // Find/match is not found
                  return reject(error.message);
                }
                // Check for an item
                if (guide) {
                  // Found, one object will be returned
                  return resolve(guide);
                } else {
                  return reject('Not found');
                }
              });
          })
        },

      // get one (or some) gameGuides, by regex in "shortTitle" field

      gameGuideGetByTitle: async function (text) {

          // URL decode the incoming value
          text = decodeURIComponent(text);
    
          // Attempt to find in the "shortTitle" field, case-insensitive
          let results = await GameGuide.find({ shortTitle: { $regex: text, $options: "i" } });
          // This will find zero or more
          return results;
        },
      
      // get one (or some) gameGuides, by author
      
      gameGuideGetByAuthor: async function (data) {
        text = decodeURIComponent(data);
        let results = await GameGuide.find({ author: text});
        return results;
      },

      // add new gameGuide

      gameGuideAdd: function (newGuide) {
          return new Promise(function (resolve, reject) {

              //let date = new Date();
              //newGuide.dateCreated = date;

              GameGuide.create(newGuide, (error, guide) => {
                  if(error) {
                      // Cannot add item
                      return reject(error.message);
                  }
                  //Added object will be returned
                  return resolve(guide);
              });

          })
      },

      // edit a particular gameGuide

      gameGuideEdit: async function (guideId, updatedGuide) {

          let  oldGuide = await GameGuide.findById(guideId);

          if(oldGuide){

              // update old version
              //oldGuide.author = updatedGuide.author;
              oldGuide.fullTitle = updatedGuide.fullTitle;
              oldGuide.shortTitle = updatedGuide.shortTitle;
              oldGuide.patch = updatedGuide.patch;
              oldGuide.category = updatedGuide.category;
              oldGuide.description = updatedGuide.description;
              oldGuide.content = updatedGuide.content;
              oldGuide.linkYouTube = updatedGuide.linkYouTube; 
              oldGuide.dateUpdated = updatedGuide.dateUpdated;
              oldGuide.images = updatedGuide.images;
      
              //oldGuide.dateUpdated = new Date();
              
              await oldGuide.save();
              return oldGuide;
          }
          else {
              throw "Not found";
          }
      },

      // update existing gameGuide - add a new comment

      gameGuideAddComment: async function (guideId, newComment){
          
          // Attempt to locate the existing document
          let gameGuide = await GameGuide.findById(guideId);

          newComment.dateCreated = new Date();

          if (gameGuide) {
              // Add the new subdocument and save
              gameGuide.comments.push(newComment);
              await gameGuide.save();
              return gameGuide;
            }
            else {
              // Uh oh, "throw" an error
              throw "Not found";
            }

      },

      // edit a comment for a gameGuide
      gameGuideEditComment: async function (commentId, updatedComment) {

        // Attempt to locate the existing document that has the desired comment
          let gameGuide = await GameGuide.findOne({ "comments._id": commentId });
      
          if (gameGuide) {
            // Attempt to locate the comment
            let comment = gameGuide.comments.id(commentId);
            // update the comment
            comment.content = updatedComment.content;

            await gameGuide.save();
            // Send the entire document back to the requestor
            return gameGuide;
          }
          else {
            // Uh oh, "throw" an error
            throw "Not found";
          }
      },

      // forum thread requests *******************************************************************

      // get all forum threads (sorted) by likes

      forumThreadGetAll: function () {
        return new Promise((resolve, reject) => {
        
          ForumThread.find()
            .sort({ likes: 'desc' })
            .exec((error, forumThreads) => {
              if (error) {
                // Query error
                return reject(error.message);
              }
              // Found, a collection will be returned
              return resolve(forumThreads);
            });
        });
      },

      // get a forum thread by object id

      forumThreadGetById: function (forumThreadId) {
        return new Promise(function (resolve, reject) {

          // Find one specific document
          ForumThread.findById(forumThreadId)
            .exec((error, forumThread) => {
              if (error) {
                // Find/match is not found
                return reject(error.message);
              }
              // Check for an item
              if (forumThread) {
                // Found, one object will be returned
                return resolve(forumThread);
              } else {
                return reject('Not found');
              }
            });
        })
      },

      // get one (or some) forumThreads, by regex in "subject" field

      forumThreadGetBySubject: async function (text) {

        // URL decode the incoming value
        text = decodeURIComponent(text);

        // Attempt to find in the "subject" field, case-insensitive
        let results = await ForumThread.find({ subject: { $regex: text, $options: "i" } });
        // This will find zero or more
        return results;
      },

      // add a new forum thread

      forumThreadAdd: function (newForumThread) {
        return new Promise(function (resolve, reject) {

            let date = new Date();
            newForumThread.dateCreated = date;

            ForumThread.create(newForumThread, (error, thread) => {
                if(error) {
                    // Cannot add item
                    return reject(error.message);
                }
                //Added object will be returned
                return resolve(thread);
            });

        })
      },

      // update existing forumThread - add a new post

      forumThreadAddPost: async function (forumThreadId, newPost){
            
          // Attempt to locate the existing document
          let forumThread = await ForumThread.findById(forumThreadId);

          newPost.dateCreated = new Date();

          if (forumThread) {
              // Add the new subdocument and save
              forumThread.posts.push(newPost);
              await forumThread.save();
              return forumThread;
            }
            else {
              // Uh oh, "throw" an error
              throw "Not found";
            }

      },

      // edit a particular post in a forumThread
      forumThreadEditPost: async function (postId, updatedPost) {

        // Attempt to locate the existing document that has the desired comment
          let forumThread = await ForumThread.findOne({ "posts._id": postId });
          if (forumThread) {
            // Attempt to locate the post
            let post = forumThread.posts.id(postId);
            // update the post
            post.content = updatedPost.content;

            await forumThread.save();
            // Send the entire document back to the requestor
            return forumThread;
          }
          else {
            // Uh oh, "throw" an error
            throw "Not found";
          }
      },


    
    } // return statement that encloses all the function members

} // module.exports