const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://lalith:Lalith123@cluster0-shard-00-00-kpxwj.gcp.mongodb.net:27017,cluster0-shard-00-01-kpxwj.gcp.mongodb.net:27017,cluster0-shard-00-02-kpxwj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });

var users_students = require('./mongo_models/user_students');
var user_colleges = require('./mongo_models/user_colleges');
var college_list = require('./mongo_models/college_list');
var result_data = require('./mongo_models/result_data');





router.get('/get_college_users', (req,res)=>{
    user_colleges.find().then((result)=>{
        res.send(result);
    });
});
router.post('/login_college_users', (req,res)=>{
    user_colleges.findOne({'username':req.body.username}).then((result)=>{
        console.log(result);
        if(result!=null){
            console.log(result);
            if(req.body.password===result.password) {
                res.send({
                    status:true,
                    data:result
                });
            } else {
                res.send({
                    status:false,
                    msg:'Wrong Password'
                })
            }
        } else {
            res.send({
                status:false,
                msg:'User Not Found'
            })
        }
    },(e)=>{
        res.send({
            status:false,
            msg:'Please Try Again'
        })
    })
});

router.get('/get_students', (req,res)=>{
    user_colleges.find().then((result)=>{
        res.send(result);
    })
});
router.get('/get_coleges_names', (req,res)=>{
    college_list.find().select('Collge_Name').sort({'Collge_Name': 1}).then((result)=>{
        res.send(result);
    });
    // college_list.remove((result)=>{
    //     res.send('all collections removed');
    // })
});

// For checking college username
router.post('/get_c_user', (req,res)=>{
    user_colleges.findOne({username: req.body.username}).then((result)=>{
        res.send(result);
    });
});
// For checking college duplication
router.post('/get_c_name', (req,res)=>{
    user_colleges.findOne({'college.name': req.body.collegename}).then((result)=>{
        res.send(result);
    });
});

// API for signup
router.post('/insert_user_college', (req,res)=>{
    // assigning dataonject to mongoose model
    user = new user_colleges(req.body);
    // Saving data in mongo database with mongoose model
        user.save().then((result)=>{
            res.send({
                Status:true,
                msg:'Successfully Signup',
                data:{
                    
                }
            });
        }).catch((e)=>{
            res.send({
                Status:false,
                msg:'Failed to signup'
            });
        });
});

router.post('/insert_user_student', (req,res)=>{
    user = new users_students({ 
        id:'13541A0503',
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


router.post('/upload_result_data', (req,res)=>{
    result_data.find({college:req.body.data.college,Description:req.body.data.Description,grade:req.body.data.grade}).then((result)=>{
        if(result.length==0){
            data = new result_data(req.body.data);
            data.save().then((reuslt)=>{
                res.send({msg:'Data Successfully Uploaded',status:true});
            },(e)=>{
                res.send({msg:'Server Bussy',status:false});
            })
        } else {
            res.send({msg:'This Result Already Exist',status:false});
        }
    },(e)=>{
        res.send({msg:'Server Bussy',status:false});
    })
});
router.get('/get_all_reults_list', (req,res)=>{
    result_data.find().select('Description grade').sort({date: -1}).then((reuslt)=>{
        res.send(reuslt);
    })
});


router.post('/get_result_data', (req,res)=>{
    result_data.findById(req.body.id).sort({date: -1}).then((reuslt)=>{
        res.send(reuslt);
    })
})
// API for uploading result data
module.exports = router;