const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://lalith:Lalith123@cluster0-shard-00-00-kpxwj.gcp.mongodb.net:27017,cluster0-shard-00-01-kpxwj.gcp.mongodb.net:27017,cluster0-shard-00-02-kpxwj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');

var users_students = require('./mongo_models/user_students');
var user_colleges = require('./mongo_models/user_colleges');


router.get('/get_college', (req,res)=>{
    user_colleges.find().then((result)=>{
        res.send(result);
    })
})

router.post('/insert_user_college', (req,res)=>{
    user = new user_colleges({
        username:'ssiet54',
        password:'ssiet.54',
        college:{
            name:'Sri Sarathi Institute of engineering and technology',
            code:54,
            address:'Nuzvid , 500005',
            reg_id:'13541A0503',
            le_id:'13545A0503',
            examcell_incharge:'Raja'
        },
        mobile:'9704620705',
        email:'ssiet54@gmail.com'
    });
    
        user.save().then((result)=>{
            res.send({Status:'DOne'});
        });
});

router.post('/insert_user_student', (req,res)=>{
    user = new users_students({ 
        id:'13541A0503'+i,
        Name:'Lalith Kumar',
        college:{
            branch:'CSE',
            course:'B-Tech',
            batch:2013
        },
        mobile:'9704620705',
        address:'Vissannapeta, 9-45,krishna Dt',
        email:'lalith889@gmail.com',
        password:'Lalith@123'
    });
    
        user.save().then((result)=>{
            res.send({Status:'DOne'});
        });
});

module.exports = router;