const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
var _ = require('lodash');
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

// API for uploading result data
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
// list of all results
router.get('/get_all_reults_list', (req,res)=>{
    result_data.find().select('Description grade').sort({date: -1}).then((reuslt)=>{
        res.send(reuslt);
    })
});

router.post('/get_result_data', (req,res)=>{
    result_data.findById(req.body.id).sort({date: -1}).then((result)=>{
        var output = result.data.filter((dataa)=>dataa.rollno.length>=10)
        result.data=output;
        res.send(result);
    },(e)=>{
        res.send({status:false,data:e})
    })
})
router.post('/remove_result_data', (req,res)=>{
    result_data.findOneAndDelete({'_id':req.body.id}).then((main_result)=>{
        result_data.find().select('Description grade').sort({date: -1}).then((reuslt)=>{
            res.send(reuslt);
        })
    },(e)=>{
        res.send({status:false,data:e})
    })
})

// list of result has only possible to analyse
router.get('/get_all_reults_list_for_analysis', (req,res)=>{
    result_data.find({analysis:true}).select('Description grade').sort({date: -1}).then((reuslt)=>{
        res.send(reuslt);
    })
});
// analysing result

router.post('/do_resultanlyz',(req,res)=>{
    result_data.findById(req.body.id).then((result)=>{
        var result_data = result;
        // For data Grouping
        function groupdata(pm1,pm2){
            return new Promise((resolve,reject)=>{
                var data= _.chain(pm1).groupBy(pm2).map(function(v, i) {
                    return {
                    value: i
                    }
                }).value()
                resolve(data);
            })
        }
        // For Analysing Result
        function do_anlyz(index){
            return new Promise((resolve,reject)=>{
                console.log('register 0');
                let branch_data = result_data.data.filter((data)=>data.rollno.indexOf(`${result_data.batch.substring(2,4)}541A0${index}`)>-1 || data.rollno.indexOf(`${parseInt(result_data.batch.substring(2,4))+1}545A0${index}`)>-1);
                let students;
                let Subject;
                let maindata={allstudents:Array,overal:Object,subwise:Array};
                let overal={passed:0,failed:0}
                groupdata(branch_data,'rollno').then((result)=>{
                    students = result
                    return groupdata(branch_data,"subcode");
                }).then((result)=>{
                Subject = result;
                for (let index = 0; index < Subject.length; index++) {
                    Subject[index].passed=0;
                    Subject[index].failed=0;
                }
                    return new Promise((resolve,reject)=>{
                        all_students=[];
                        subects_data=[];
                        for(let stu=0; stu<students.length; stu++) {
                            let single_stu={};
                            let totalmarks=0;
                            var stu_allsub=branch_data.filter((data)=>data.rollno==students[stu].value);
                            var passed=stu_allsub.filter((data)=>data.credits==0);
                            if(passed.length==0){ overal.passed++; single_stu.status=true;} else { overal.failed++; single_stu.status=false;}
                            for(let sub=0; sub<Subject.length; sub++){
                                single_stu.rollno=students[stu].value
                                new Promise((resolve,reject)=>{resolve(stu_allsub.filter((data)=>data.subcode==Subject[sub].value && data!=null))})
                                .then((result)=>{
                                    if(result[0]!=null){
                                        Subject[sub].sub_name=stu_allsub.filter((data)=>data.subcode==Subject[sub].value)[0].subname
                                        if(result[0].credits>0) {
                                            Subject[sub].passed++
                                            single_stu['sub'+sub]=parseInt(result[0].internals)+parseInt(result[0].externals);
                                            totalmarks=totalmarks+parseInt(result[0].internals)+parseInt(result[0].externals);
                                        } else {
                                            Subject[sub].failed++
                                            single_stu['sub'+sub]='----';
                                        }
                                        single_stu.totalmarks=totalmarks;

                                    }
                                })
                            }
                            all_students.push(single_stu);
                        }
                        maindata.allstudents=all_students
                        maindata.overal=overal
                        maindata.subwise=Subject
                        resolve(maindata);
                    })
                }).then((result)=>{
                    resolve(result);
                }).then(()=>{
                    console.log("All Promises Resolved");
                })
            });
        }
        // End Of result Analysing
        var resdata=[];
        do_anlyz(2).then((result)=>{
            let data={title:'EEE',data:result}
            resdata.push(data);
            return do_anlyz(3);
        }).then((result)=>{
            let data={title:'MECH',data:result}
            resdata.push(data);
            return do_anlyz(4);
        }).then((result)=>{
            let data={title:'ECE',data:result}
            resdata.push(data);
            return do_anlyz(5);
        }).then((result)=>{
            let data={title:'CSE',data:result}
            resdata.push(data);
            res.send({Status:true,data:resdata})
        }).catch((e)=>{
            res.send({Status:false, msg:'Somthing Went Wrong'})
        })
    })
})

module.exports = router;