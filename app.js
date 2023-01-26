var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose"); //middleware framework for easing use of mongodb
var { urlencoded } = require("express");

var port = process.env.port||3000;

//setup bodyparser for the app 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

//connecting to mongoose
mongoose.connect("mongodb://localhost:27017/gameEntries", {
    useNewURLParser:true
}).then(function(){ //callback functionality
    console.log("Connected to MongoDB");
}).catch(function(err){    //secondary callback functionality
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("game");
//EXAMPLE ROUTES
//initial route creation test
app.get("/", function(req, res){
    res.send("Hello There!");
})
app.get("/mvc", function(req, res){
    res.send("Whats crackin dude.");
})

app.post("/saveGame", function(req, res){   //form action must match this, form action name defines the route that is being taken
    console.log(req.body);  //output of the req.body to the terminal
    //res.send(req.body); //output of the JSON data from the DOC

    new Game(req.body).save().then(function(){
        //res.redirect("index.html");//a way to push the submit reload back to the original page
    })
})

app.get("/getGames", function(req, res){
    Game.find({}).then(function(game){
        console.log(game);
        res.json(game);
    })
})


app.use(express.static(__dirname+"/pages"));
app.listen(3000, function()
{
    console.log(`Running on port: ${port}`);
})