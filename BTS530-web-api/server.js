

// Web service setup

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
// Or use some other port number that you like better

// Add support for incoming JSON entities
app.use(bodyParser.json());
// Add support for CORS
app.use(cors());

// Data model and persistent store setup
const manager = require("./manager.js");
const m = manager();

// upload image
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname)
  }
})

var upload = multer({storage: storage})



// ################################################################################
// Resources available in this web API

// *********************************************************************
// Security setup

// Passport.js components
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

// JSON Web Token Setup
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Configure its options
var jwtOptions = {};
// Configure the issuer
jwtOptions.issuer = 'useraccounts.example.com';
// Choose whether the incoming authorization header scheme is BEARER or JWT
//jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

// IMPORTANT - the following secret should be a long, unguessable string 
// (ideally stored in a "protected storage" area on the 
// web server, a topic that is beyond the scope of this course)
// You MUST generate a random 64-character string using the following online tool:
// https://lastpass.com/generatepassword.php 
// And use it as the value for the following...
//jwtOptions.secretOrKey = 'generate-your-own-value';
jwtOptions.secretOrKey = 'B^pusFgZDEBFRLj8Ee#yU8oL&3rDIC#KfC01wkyC^glRPdHg#IRVJLphuUHw$I5l';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {

  // Get the timestamp now
  let now = Date.now();
  now = Math.round(now / 1000);

  // Unpack and validate the token by ensuring that it has not expired
  if (jwt_payload && now < jwt_payload.exp) {
    // Attach the token's contents to the request
    // It will be available as "req.user" in the route handler functions
    next(null, jwt_payload);
  } else {
    next(null, false);
  }
});

// Activate the security system
passport.use(strategy);
app.use(passport.initialize());

// Deliver the app's home page to browser clients
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});


// ***************************************************************************
// Requests to handle user account tasks


// Get info about me; it will return the token contents
app.get("/api/useraccounts/me", passport.authenticate('jwt', { session: false }), (req, res) => {
  // Return the token contents
  res.json({ "message": "Token contents", token: req.user });
});

// Get all (for dev testing only; DISABLE or PROTECT before deployment!)
// (Maybe make it available only to requests that have the "UserAccountManager" role)
/*
app.get("/api/user-accounts", (req, res) => {
  // Call the manager method
  m.useraccountsGetAll()
    .then((data) => {
      //res.json(data);
      res.json(package(data, '/api/useraccounts'));
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});
*/

/*
// Get one (for dev testing only; DISABLE or PROTECT before deployment!)
// (Maybe make it available only to requests that have the "UserAccountManager" role)
app.get("/api/user-accounts/:id", (req, res) => {
  // Call the manager method
  m.userAccountsGetById(req.params.id)
    .then((data) => {
      //res.json(data);
      res.json(package(data, '/api/useraccounts'));
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});*/

/*
// User account activate
app.post("/api/user-accounts/activate", (req, res) => {

  m.userAccountsActivate(req.body)
    .then((data) => {
      res.json({ "message": data });
    }).catch((msg) => {
      res.status(400).json({ "message": msg });
    });
});*/

// User account register/create
app.post("/api/user-accounts/register", (req, res) => {

  m.userAccountsRegister(req.body)
    .then((data) => {
      res.json({ "message": data });
    }).catch((msg) => {
      //console.log(req.body);
      res.status(400).json({ "message": msg });
    });
});

// User account login
app.post("/api/user-accounts/login", (req, res) => {

  // Incoming data package has the following:
  // { "username": "xxx", "password": "yyy" }

  m.userAccountsLogin(req.body)
    .then((data) => {

      
      // Calculate an expiry time...
      // There are 86400 seconds in a day
      // Assume a token lifetime of 14 days
      let now = Date.now();
      //let exp = Math.round(now / 1000) + (86400 * 14);
      // For testing purposes, expire the token in 120 seconds
      let exp = Math.round(now / 1000) + 3600;

      // Configure the payload with data and claims
      // Properties are defined here...
      // https://tools.ietf.org/html/rfc7519
      var payload = {
      iss: 'useraccounts.example.com',
      exp: exp,
      //_id: data._id,
      username: data.username
      //email: data.username,
      //name: data.fullName,
      //roles: data.roles,
      //claims: data.claims
      // Can add more if required
      };
      
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      // Return the result
      res.json({ "loginStatus": true, token: token });
      

    }).catch((status) => {
      token = "";
      //res.status(400).json({ "message": msg });
      //res.json({"message": "Login has failed, invalid username or password"});
      res.json({ "loginStatus": status, token: token });
    });
});


// gameGuide requests *******************************

// Get all (sorted)
app.get('/api/game-guides/all', (req, res) => {
  // Call the manager
  m.gameGuideGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ 'message': error });
    })
});

// Get one, by object identifier
app.get("/api/game-guides/by-id/:id", (req, res) => {
  // Call the manager method
  m.gameGuideGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// get one (or some) gameGuides, by  regex in “shortTitle” field
app.get("/api/game-guides/by-short-title/:word", (req, res) => {
  // Call the manager method
  m.gameGuideGetByTitle(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// get one or some gameGuides, by author
app.get("/api/game-guides/by-author/:author", (req, res) => {
  // Call the manager method
  m.gameGuideGetByAuthor(req.params.author)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Add new
// This will need a "gameGuide" document 
app.post("/api/game-guides/add", passport.authenticate('jwt', { session: false }), (req, res) => {
  // Call the manager method
  //console.log(req.user);

  m.gameGuideAdd(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Edit a particular gameGuide
app.put("/api/game-guides/edit/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  // Call the manager method
  m.gameGuideEdit(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Update existing - add a new game guide comment
app.post("/api/game-guides/:id/add-comment", (req, res) => {
  // Call the manager method
  m.gameGuideAddComment(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Update a comment for a gameGuide
app.put("/api/game-guides/edit-comment/:id", (req, res) => {
  // Call the manager method
  m.gameGuideEditComment(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Delete a comment for a commentGuide
app.delete("/api/game-guides/delete-comment/:id", (req, res) => {
  // Call the manager method
  m.commentGuideDeleteComment(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// forum thread requests *******************************************************************

// Get all (sorted)
app.get('/api/forum-threads/all', (req, res) => {
  // Call the manager
  m.forumThreadGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ 'message': error });
    })
});

// Get one forum thread, by object identifier
app.get("/api/forum-threads/by-id/:id", (req, res) => {
  // Call the manager method
  m.forumThreadGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// get one (or some) forum threads, by regex in “subject” field 
app.get("/api/forum-threads/by-subject/:word", (req, res) => {
  // Call the manager method
  m.forumThreadGetBySubject(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Add new
// This will need a "thread" document 
app.post("/api/forum-threads/add", (req, res) => {
  // Call the manager method
  m.forumThreadAdd(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Update existing forumThread - add a new Post
app.put("/api/forum-threads/edit/:id/add-post", (req, res) => {
  // Call the manager method
  m.forumThreadAddPost(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Update a post on a thread
app.put("/api/forum-threads/edit-post/:id", (req, res) => {
  // Call the manager method
  m.forumThreadEditPost(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});






// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send("Resource not found");
});


// ################################################################################
// Attempt to connect to the database, and
// tell the app to start listening for requests

m.connect().then(() => {
  app.listen(HTTP_PORT, () => { console.log("Ready to handle requests on port " + HTTP_PORT) });
})
  .catch((err) => {
    console.log("Unable to start the server:\n" + err);
    process.exit();
  });