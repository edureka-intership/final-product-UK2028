const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema([
    {
        name:{
            type:String,
            required:true
        }
        ,email:{
            type:String,
            required:true
        }
    },
    {
        password:{
            type:String,
            required:true
        }
    }
])

module.exports = mongoose.model('loginDetails',mongooseSchema,'loginDetails');