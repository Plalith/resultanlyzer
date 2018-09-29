const mongoose = require('mongoose');

var users_students = mongoose.model('users_students', {
    id:{
        type:String,
        trim:true
    },
    Name:{
        type:String,
        trim:true
    },
    college:{
        branch:{
            type:String,
            trim:true
        },
        course:{
            type:String,
            trim:true
        },
        batch:{
            type:Number,
            trim:true
        }
    },
    mobile:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    }
}); 

module.exports = users_students