//SCHEMA FILE
var mongoose = require("mongoose");
var { stringify } = require("nodemon/lib/utils");
var Schema = mongoose.Schema;

//declare a new schema for json to follow / use for validate
var Schema =  new Schema({
    game:
    {
        type:String,
        required:true
    }
});

mongoose.model("game", Schema);