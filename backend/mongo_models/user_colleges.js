const mongoose = require('mongoose');

var users_colleges = mongoose.model('users_colleges', {
    username:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    college:{
        name:{
            type:String,
            trim:true
        },
        code:{
            type:String,
            trim:true
        },
        address:{
            type:String,
            trim:true
        },
        reg_id:{
            type:String,
            trim:true
        },
        le_id:{
            type:String,
            trim:true
        },
        examcell_incharge:{
            type:String,
            trim:true
        }
    },
    mobile:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    }
}); 

module.exports = users_colleges