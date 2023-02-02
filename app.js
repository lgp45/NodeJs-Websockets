//base setup
var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose"); //middleware framework for easing use of mongodb
var { urlencoded } = require("express");
var port = process.env.port||3000;

//database linker
//require a specifc route
var db = require("./config/database")

//setup bodyparser for the app 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

//connecting with mongoose to mongodb
mongoose.connect(db.mongoRUI, {
    useNewURLParser:true
}).then(function(){ //callback functionality
    console.log("Connected to MongoDB");
}).catch(function(err){    //secondary callback functionality
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("Game");

//EXAMPLE ROUTES
//initial route creation test
app.get("/", function(req, res){
    
})
app.get("/mvc", function(req, res){
    res.send("Whats crackin dude.");
})

//initiate save
app.post("/saveGame", function(req, res){   //form action must match this, form action name defines the route that is being taken
    //console.log(req.body);  //output of the req.body to the terminal
    //res.send(req.body); //output of the JSON data from the DOC

    new Game(req.body).save().then(function(){
        res.redirect("gameList.html");//a way to push the submit reload back to the original page
    })
})

//initiate get of game list
app.get("/getGames", function(req, res){
    Game.find({}).then(function(game){
        //console.log(game);
        res.json({game});
    })
})

app.post("/deleteGame", function(req, res){
    console.log(`Game Deleted ${req.body.game._id}`);
    Game.findByIdAndDelete(req.body.game._id).exec();
    res.redirect("/gameList.html");
})

app.use(express.static(__dirname+"/pages"));
app.listen(3000, function()
{
    console.log(`Running on port: ${port}`);
})
