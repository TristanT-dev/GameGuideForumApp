

// Web service setup

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
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

// Deliver the app's home page to browser clients
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

// ################################################################################
// Resources available in this web API


//


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

// Add new
// This will need a "gameGuide" document 
app.post("/api/game-guides/add", (req, res) => {
  // Call the manager method
  m.gameGuideAdd(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Edit a particular gameGuide
app.put("/api/game-guides/edit/:id", (req, res) => {
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
app.put("/api/game-guides/edit/:id/add-comment", (req, res) => {
  // Call the manager method
  m.gameGuideAddComment(req.params.id, req.body)
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