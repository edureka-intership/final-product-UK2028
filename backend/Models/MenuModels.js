const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema({
    restaurantName:{
        type:String,
        required:true
    },
    itemPrice:{
        type:Number,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    itemDescription:{
        type:String,
        required:true
    },
    isVeg:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('menu',mongooseSchema,'menu');
