var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;

var db = require("./config/database");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("game");

//example routes
app.get("/", function(req,res){
    //res.send("Hello There");
    res.redirect("gameList.html");
})

app.get("/poop", function(req,res){
    res.send("What's crackin dude?");
})

app.post("/saveGame", function(req,res){
    console.log(req.body);
    new Game(req.body).save().then(function(){
        //res.send(req.body);
        res.redirect("gameList.html");
    });
})

app.get("/getGames", function(req,res){
    Game.find({}).then(function(game){
        //console.log({game});
        res.json({game});
    })
})

app.post("/deleteGame", function(req,res){
    console.log(`Game Deleted ${req.body.game._id}`);
    Game.findByIdAndDelete(req.body.game._id).exec();
    res.redirect('gameList.html');
})

//update route using a POST REQUEST
app.post("/updateGame", function(req, res){

    console.log("Post request made:");
    console.log(req.body);
    //res.redirect('gameList.html');

    Game.findByIdAndUpdate(req.body.id, {game: req.body.game}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Game : ", docs);
            res.redirect('gameList.html');
        }
    });
});


app.get("/getID::id", function(req, res){
    console.log(req.body.game._id);
    res.redirect("updatePage.html?id=" + req.params.id);
})


//Unity Route Testing
app.post("/unity", function(req, res){
    console.log("Hello from Unity.");
    //prep an object to recieve the object data
    var unityData = {
        "level" : req.body.level,   //we can grab basedon the parameter name values of the obj we want to grab
        "timeElapsed" : req.body.timeElapsed,
        "name" : req.body.name
    }
    console.log(unityData);
})

app.get("/sendUnityData", function(req, res){
    console.log("request made");
    var dataToSend = 
    {
        "level" : 9001,   //we can grab basedon the parameter name values of the obj we want to grab
        "timeElapsed" : 2250.65,
        "name" : "Lazlo Cravensworth"
    }
    res.send(dataToSend);
})


app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
   
})