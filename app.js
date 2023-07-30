// var express = require("express");
// var app = express();
// var path = require("path");
// var bodyparser = require("body-parser");
// var mongoose = require("mongoose");
// var port = process.env.port||3000;

// var db = require("./config/database");
// var dbc = mongoose.connection;
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:true}));
// app.use(express.json());

// mongoose.connect(db.mongoURI,{
//     useNewURLParser:true
// }).then(function(){
//     console.log("Connected to MongoDB Database");
// }).catch(function(err){
//     console.log(err);
// });

// require("./models/Game");
// var Game = mongoose.model("game");

// //example routes
// app.get("/", function(req,res){
//     //res.send("Hello There");
//     res.redirect("gameList.html");
// })

// app.get("/poop", function(req,res){
//     res.send("What's crackin dude?");
// })

// app.post("/saveGame", function(req,res){
//     console.log(req.body);
//     new Game(req.body).save().then(function(){
//         //res.send(req.body);
//         res.redirect("gameList.html");
//     });
// })

// app.get("/getGames", function(req,res){
//     Game.find({}).then(function(game){
//         //console.log({game});
//         res.json({game});
//     })
// })

// app.post("/deleteGame", function(req,res){
//     console.log(`Game Deleted ${req.body.game._id}`);
//     Game.findByIdAndDelete(req.body.game._id).exec();
//     res.redirect('gameList.html');
// })

// //update route using a POST REQUEST
// app.post("/updateGame", function(req, res){

//     console.log("Post request made:");
//     console.log(req.body);
//     //res.redirect('gameList.html');

//     Game.findByIdAndUpdate(req.body.id, {game: req.body.game}, function (err, docs) {
//         if (err){
//             console.log(err)
//         }
//         else{
//             console.log("Updated Game : ", docs);
//             res.redirect('gameList.html');
//         }
//     });
// });

/*
app.get("/gameEntries", function(req, res)
{
    Game.find({}).sort({game:1}).then(function(game){
        //console.log({game});
        res.json({game});
    });
    */
    /*
    const collection = dbc.collection("games");
    const sortField = req.query.sortBy || 'title';

    // Extract the sort direction from the query string
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  
    // Construct the sort criteria
    const sort = {};
    sort[sortField] = sortOrder;

    Game.find().sort(sort).toArray((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching data from the database');
        return;
      }

      res.send(result);
      dbc.close();
    });
    */
    
//});


// app.get("/getID::id", function(req, res){
//     console.log(req.body.game._id);
//     res.redirect("updatePage.html?id=" + req.params.id);
// })

// app.get("/gameEntries", function(req, res) {
//     var { column, sort } = req.query;

//     var sortOrder = sort === '-' ? -1 : 1; // if sort is '-', sort in descending order
//     var sortColumn = column || 'game'; // default sort column is 'game'
//     console.log("sorting...");
//     Game.find().sort({ [sortColumn]: sortOrder }).then(function(game) {
//       res.json({ game });
//     }).catch(function(err) {
//       console.error(err);
//       res.status(500).send("An error occurred while fetching data from the database");
//     });
    
//   });

//   app.get('/gameEntries/search', function(req, res) {
//     var { col, val } = req.query;
//     var searchCol = col;
//     var searchVal = val;
//     Game.findOne({col: val}).then(function(game){
//         res.json({game});
//     })
  
// });


// //Unity Route Testing
// app.post("/unity", function(req, res){
//     console.log("Hello from Unity.");
//     //prep an object to recieve the object data
//     var unityData = {
//         "level" : req.body.level,   //we can grab basedon the parameter name values of the obj we want to grab
//         "timeElapsed" : req.body.timeElapsed,
//         "name" : req.body.name
//     }
//     console.log(unityData);
// })

// app.get("/sendUnityData", function(req, res){
//     console.log("request made");
//     var dataToSend = 
//     {
//         "level" : 9001,   //we can grab basedon the parameter name values of the obj we want to grab
//         "timeElapsed" : 2250.65,
//         "name" : "Lazlo Cravensworth"
//     }
//     res.send(dataToSend);
// })
// app.js (or your server file)
// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const WebSocket = require('ws');
// // var port = process.env.port||3000;
// const wss = new WebSocket.Server({ server: http });

// wss.on('connection', (ws) => {
//   console.log('A client connected to the WebSocket server.');

//   ws.on('message', (message) => {
//     console.log('Received message from client:', message);
//     ws.send("You have joined the socketwerkz.");
//     // Handle the message from the Unity game server
//     // and send a response if needed.
//     // You can implement custom logic here.
//   });

//   ws.on('close', () => {
//     console.log('A client disconnected from the WebSocket server.');
//   });
// });

// // ... Add your other Express routes and middleware here ...

// const PORT = process.env.PORT || 8080;

// http.listen(PORT, () => {
//   console.log(`Express server listening on port ${PORT}`);
// });
// app.js (or your server file)
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');

const wssRelay = new WebSocket.Server({ server: http });

// Store WebSocket connections to GameServer A and GameServer B.
let wsGameServerA = null;
let wsGameServerB = null;

wssRelay.on('connection', (ws) => {
  console.log('A game server connected to the relay server.');

  // Identify the game server (GameServer A or GameServer B) based on a query parameter or authentication.
  // For simplicity, let's assume the query parameter "server" is used, where "a" or "b" indicates the server.
  const serverId = new URLSearchParams(ws.upgradeReq.url).get('server');

  if (serverId === 'a') {
    // If the game server is GameServer A, store its WebSocket connection.
    wsGameServerA = ws;
    console.log('GameServer A connected.');
  } else if (serverId === 'b') {
    // If the game server is GameServer B, store its WebSocket connection.
    wsGameServerB = ws;
    console.log('GameServer B connected.');
  }

  ws.on('message', (message) => {
    console.log('Received message from game server:', message);

    // Handle messages received from the game servers.
    // You can implement custom logic here.
  });

  ws.on('close', () => {
    console.log('A game server disconnected from the relay server.');

    // Handle disconnections of game servers if needed.
    // For example, if GameServer A disconnects, you can set wsGameServerA = null.
    // Be sure to handle client transfers in such cases and manage reconnections.
  });
});

// ... Add your other Express routes and middleware here ...

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Relay server listening on port ${PORT}`);
});

