const mongoose = require('mongoose');
const DataBase = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Discription:{
        type:String,
        required:true
    },
    Status:{
        type:Boolean,
        default:false
    },
    CreatesAt:{
        type:Date,
        default:Date.now
    }
})
Module.exports = mongoose.model("database",DataBase)