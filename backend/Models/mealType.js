const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('mealtype',mongooseSchema,'mealtype');