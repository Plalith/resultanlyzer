const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
mongoose.connect('mongodb://lalith:Lalith123@cluster0-shard-00-00-kpxwj.gcp.mongodb.net:27017,cluster0-shard-00-01-kpxwj.gcp.mongodb.net:27017,cluster0-shard-00-02-kpxwj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });
var users_students = require('./mongo_models/user_students');
var user_colleges = require('./mongo_models/user_colleges');
var college_list = require('./mongo_models/college_list');
var result_data = require('./mongo_models/result_data');
var students = require('./mongo_models/students');

var setlement = {
    id: 10
}
var tokens = {}

// Add student manually 
router.post('/add_student_man', (req, res) => {
    new_serises = new students(req.body.student);
    var student = req.body.student.students
    students.find({ u_desc: req.body.student.u_desc }).then((result) => {
        if (result.length === 0) {
            new_serises.save().then((result) => {
                res.send({status:true,msg:'Sucessfully Added'});
            }).catch((e)=>{res.send({status:false,msg:'Unable To Add Data Try After Some Time'})});
        } else {
            students.update(
                { u_desc: req.body.student.u_desc },
                { $addToSet: { students: { $each: student } } }
            ).then((pushed) => {
                res.send({status:true,msg:'Sucessfully Added'});
            }).catch((e)=>{res.send({status:false,msg:'Unable To Add Data Try After Some Time'})});
        }
    }).catch((e)=>{
        res.send({status:false,msg:'Technical Issue Please Try After Some Time'})
    });
})
// End add student manually
router.get('/status', (req, res) => {
    result_data.find({ data: { $size: 2 } }).then((result) => {
        res.send(result);
    })
})

router.get('/get_college_users', (req, res) => {
    user_colleges.find().then((result) => {
        res.send(result);
    });
});

router.post('/login_college_users', (req, res) => {
    user_colleges.findOne({ 'username': req.body.username }).then((result) => {
        if (result != null) {
            if (req.body.password === result.password) {
                let user_raw_tok = `hello`;
                let token_val = jwt.sign(setlement, user_raw_tok);
                tokens[result.username] = user_raw_tok;
                res.send({
                    status: true,
                    data: {
                        username: result.username,
                        payment_status: result.payment.status,
                        c_name: result.college.name,
                        reg_id: result.college.reg_id,
                        le_id: result.college.le_id,
                        mobile: result.mobile,
                        email: result.email,
                        opt_ver: result.opt_ver,
                        user_type: 'college',
                        logindate: new Date(),
                        token_val: token_val
                    }
                });
            } else {
                res.send({
                    status: false,
                    msg: 'Wrong Password'
                })
            }
        } else {
            res.send({
                status: false,
                msg: 'User Not Found'
            })
        }
    }, (e) => {
        res.send({
            status: false,
            msg: 'Please Try Again'
        })
    })
});

router.get('/get_students', (req, res) => {
    user_colleges.find().then((result) => {
        res.send(result);
    })
});
router.get('/get_coleges_names', (req, res) => {
    college_list.find().select('Collge_Name').sort({ 'Collge_Name': 1 }).then((result) => {
        res.send(result);
    });
    // college_list.remove((result)=>{
    //     res.send('all collections removed');
    // })
});

// For checking college username
router.post('/get_c_user', (req, res) => {
    user_colleges.findOne({ username: req.body.username }).then((result) => {
        res.send(result);
    });
});
// For checking college duplication
router.post('/get_c_name', (req, res) => {
    user_colleges.findOne({ 'college.name': req.body.collegename }).then((result) => {
        res.send(result);
    });
});

// API for signup
router.post('/insert_user_college', (req, res) => {
    // assigning dataonject to mongoose model
    user = new user_colleges(req.body);
    // Saving data in mongo database with mongoose model
    user.save().then((result) => {
        res.send({
            Status: true,
            msg: 'Successfully Signup',
            data: {

            }
        });
    }).catch((e) => {
        res.send({
            Status: false,
            msg: 'Failed to signup'
        });
    });
});

router.post('/insert_user_student', (req, res) => {
    user = new users_students({
        id: '13541A0503',
        Name: 'Lalith Kumar',
        college: {
            branch: 'CSE',
            course: 'B-Tech',
            batch: 2013
        },
        mobile: '9704620705',
        address: 'Vissannapeta, 9-45,krishna Dt',
        email: 'lalith889@gmail.com',
        password: 'Lalith@123'
    });
    user.save().then((result) => {
        res.send({ Status: 'DOne' });
    });
});

// API for uploading result data
router.post('/upload_result_data', (req, res) => {
    result_data.find({ college: req.body.data.college, Description: req.body.data.Description, grade: req.body.data.grade }).then((result) => {
        if (result.length == 0) {
            data = new result_data(req.body.data);
            data.save().then((reuslt) => {
                res.send({ msg: 'Data Successfully Uploaded', status: true });
            }, (e) => {
                res.send({ msg: 'Server Bussy', status: false });
            })
        } else {
            res.send({ msg: 'This Result Already Exist', status: false });
        }
    }, (e) => {
        res.send({ msg: 'Server Bussy', status: false });
    })
});
// list of all results
router.get('/get_all_reults_list', (req, res) => {
    result_data.find().select('Description grade college').sort({ date: -1 }).then((reuslt) => {
        res.send(reuslt);
    })
});
router.post('/get_student_result', (req, res) => {
    // Function For grouping
    function groupdata(pm1, pm2) {
        return new Promise((resolve, reject) => {
            var data = _.chain(pm1).groupBy(pm2).map(function (v, i) {
                return {
                    value: i
                }
            }).value()
            resolve(data);
        })
    }
    result_data.aggregate([
        { "$match": { "college": `${req.body.clg_uname}` } },
        {
            $project: {
                data: {
                    $filter: {
                        input: "$data",
                        as: "student",
                        cond: {
                            "$or": [
                                { "$eq": ["$$student.rollno", `${req.body.stu_id}`] },
                            ]
                        }
                    },
                },
                semcode: 1,
            }
        }
    ]).then((result) => {
        return new Promise(async (resolve, reject) => {
            let stu_data = [];
            stu_data.push(result);
            var filtered = stu_data[0].filter((data) => data.data.length > 0)
            resolve(await filtered);
        });
    }).then(async (result) => {
        return new Promise(async (resolve, reject) => {
            let all_sem = ['11', '12', '21', '22', '31', '32', '41', '42'];
            let all_data = { all_backlogs: 0, data: [], stu_id: req.body.stu_id };
            for (let sem = 0; sem < all_sem.length; sem++) {
                let fined = result.filter((data) => data.semcode == all_sem[sem]);
                let joindata = [];
                let sem_data = { sem: all_sem[sem], data: [], backlogs: 0 };
                for (let m = 0; m < await fined.length; m++) {
                    for (let k = 0; k < await fined[m].data.length; k++) {
                        joindata.push(fined[m].data[k]);
                    }
                }
                groupdata(await joindata, 'subcode').then(async (subjects) => {
                    for (let e_s = 0; e_s < subjects.length; e_s++) {
                        let each_sub = {};
                        let sub = joindata.filter((data) => data.subcode == subjects[e_s].value);
                        if (sub.filter((data) => data.credits > 0).length > 0) {
                            each_sub = sub.filter((data) => data.credits > 0)[0]
                        } else {
                            sem_data.backlogs++;
                            all_data.all_backlogs++;
                            each_sub = sub[0];
                        }
                        each_sub.count = sub.length;
                        sem_data.data.push(each_sub)
                    }
                    all_data.data.push(await sem_data);
                })
            }
            resolve(await all_data)
        })
    }).then((result) => {
        res.send({ status: true, data: result, msg: `Sucssfully Listsed result of ${req.body.stu_id}` });
    }).catch((err) => {
        res.send({ status: false, msg: 'Server Issue Please try again' })
    })
});
router.post('/get_result_data', (req, res) => {
    result_data.findById(req.body.id).sort({ date: -1 }).then((result) => {
        var output = result.data.filter((dataa) => dataa.rollno.length >= 10)
        result.data = output;
        res.send(result);
    }, (e) => {
        res.send({ status: false, data: e })
    })
})
router.post('/remove_result_data', (req, res) => {
    result_data.findOneAndDelete({ '_id': req.body.id }).then((main_result) => {
        result_data.find().select('Description grade').sort({ date: -1 }).then((reuslt) => {
            res.send(reuslt);
        })
    }, (e) => {
        res.send({ status: false, data: e })
    })
})

// list of result has only possible to analyse
router.get('/get_all_reults_list_for_analysis', (req, res) => {
    result_data.find().select('Description grade').sort({ date: -1 }).then((reuslt) => {
        res.send(reuslt);
    })
});

// analysing result
router.post('/do_resultanlyz', (req, res) => {
    result_data.findById(req.body.id).then((result) => {
        var result_data = result;
        // For data Grouping
        function groupdata(pm1, pm2) {
            return new Promise((resolve, reject) => {
                var data = _.chain(pm1).groupBy(pm2).map(function (v, i) {
                    return {
                        value: i
                    }
                }).value()
                resolve(data);
            })
        }
        // For Analysing Result
        function do_anlyz(index) {
            return new Promise((resolve, reject) => {
                console.log('register 0');
                let branch_data = result_data.data.filter((data) => data.rollno.indexOf(`${result_data.batch.substring(2, 4)}541A0${index}`) > -1 || data.rollno.indexOf(`${parseInt(result_data.batch.substring(2, 4)) + 1}545A0${index}`) > -1);
                let students;
                let Subject;
                let maindata = { allstudents: Array, overal: Object, subwise: Array };
                let overal = { passed: 0, failed: 0 }
                groupdata(branch_data, 'rollno').then((result) => {
                    students = result
                    return groupdata(branch_data, "subcode");
                }).then((result) => {
                    Subject = result;
                    for (let index = 0; index < Subject.length; index++) {
                        Subject[index].passed = 0;
                        Subject[index].failed = 0;
                    }
                    return new Promise((resolve, reject) => {
                        all_students = [];
                        subects_data = [];
                        for (let stu = 0; stu < students.length; stu++) {
                            let single_stu = {};
                            let totalmarks = 0;
                            var stu_allsub = branch_data.filter((data) => data.rollno == students[stu].value);
                            var passed = stu_allsub.filter((data) => data.credits == 0);
                            if (passed.length == 0) { overal.passed++; single_stu.status = true; } else { overal.failed++; single_stu.status = false; }
                            for (let sub = 0; sub < Subject.length; sub++) {
                                single_stu.rollno = students[stu].value
                                new Promise((resolve, reject) => { resolve(stu_allsub.filter((data) => data.subcode == Subject[sub].value && data != null)) })
                                    .then((result) => {
                                        if (result[0] != null) {
                                            Subject[sub].sub_name = stu_allsub.filter((data) => data.subcode == Subject[sub].value)[0].subname
                                            if (result[0].credits > 0) {
                                                Subject[sub].passed++
                                                single_stu['sub' + sub] = parseInt(result[0].internals) + parseInt(result[0].externals);
                                                totalmarks = totalmarks + parseInt(result[0].internals) + parseInt(result[0].externals);
                                            } else {
                                                Subject[sub].failed++
                                                single_stu['sub' + sub] = '----';
                                            }
                                            single_stu.totalmarks = totalmarks;
                                        }
                                    })
                            }
                            all_students.push(single_stu);
                        }
                        maindata.allstudents = all_students
                        maindata.overal = overal
                        maindata.subwise = Subject
                        resolve(maindata);
                    })
                }).then((result) => {
                    resolve(result);
                }).then(() => {
                    console.log("All Promises Resolved");
                })
            });
        }
        function do_anlyz_grade(index) {
            return new Promise((resolve, reject) => {
                console.log('register 0');
                var pointsobj = { O: 10, S: 9, A: 8, B: 7, C: 6, D: 5, F: 4, ABSENT: 0, absent: 0 }
                let branch_data = result_data.data.filter((data) => data.rollno.indexOf(`${result_data.batch.substring(2, 4)}541A0${index}`) > -1 || data.rollno.indexOf(`${parseInt(result_data.batch.substring(2, 4)) + 1}545A0${index}`) > -1);
                let students;
                let Subject;
                let maindata = { allstudents: Array, overal: Object, subwise: Array };
                let overal = { passed: 0, failed: 0 }
                groupdata(branch_data, 'rollno').then((result) => {
                    students = result
                    return groupdata(branch_data, "subcode");
                }).then((result) => {
                    Subject = result;
                    for (let index = 0; index < Subject.length; index++) {
                        Subject[index].passed = 0;
                        Subject[index].failed = 0;
                    }
                    return new Promise(async (resolve, reject) => {
                        all_students = [];
                        subects_data = [];
                        for (let stu = 0; stu < students.length; stu++) {
                            let to_cr = 0;
                            var geadepercent = 0;
                            let single_stu = {};
                            let totalmarks = 0;
                            var stu_allsub = branch_data.filter((data) => data.rollno == students[stu].value);
                            var passed = stu_allsub.filter((data) => data.credits == 0);
                            if (passed.length == 0) { overal.passed++; single_stu.status = true; } else { overal.failed++; single_stu.status = false; }
                            for (let sub = 0; sub < Subject.length; sub++) {
                                single_stu.rollno = students[stu].value
                                new Promise(async (resolve, reject) => { resolve(stu_allsub.filter((data) => data.subcode == Subject[sub].value && data != null)) })
                                    .then(async (result) => {
                                        if (result[0] != null) {
                                            Subject[sub].sub_name = stu_allsub.filter((data) => data.subcode == Subject[sub].value)[0].subname

                                            if (result[0].credits > 0) {
                                                Subject[sub].passed++
                                                single_stu['sub' + sub] = result[0].grade;
                                                geadepercent = geadepercent + (pointsobj[result[0].grade] * parseInt(result[0].credits));
                                                to_cr = to_cr + parseInt(result[0].credits);
                                            } else {
                                                Subject[sub].failed++
                                                single_stu['sub' + sub] = '----';
                                                geadepercent = geadepercent + (pointsobj[result[0].grade] * parseInt(result[0].credits));
                                                to_cr = to_cr + parseInt(result[0].credits);
                                            }
                                            single_stu.totalmarks = await geadepercent;
                                            single_stu.total_credits = await to_cr;
                                            single_stu.grade = true;
                                        }
                                    })
                            }
                            all_students.push(await single_stu);
                        }
                        maindata.allstudents = all_students
                        maindata.overal = overal
                        maindata.subwise = Subject
                        resolve(maindata);
                    })
                }).then((result) => {
                    resolve(result);
                }).then(() => {
                    console.log("All Promises Resolved");
                })
            });
        }
        // End Of result Analysing
        if (result_data.grade == true) {
            var resdata = [];
            do_anlyz_grade(2).then((result) => {
                let data = { title: 'EEE', data: result }; resdata.push(data); return do_anlyz_grade(3);
            }).then((result) => {
                let data = { title: 'MECH', data: result }; resdata.push(data); return do_anlyz_grade(4);
            }).then((result) => {
                let data = { title: 'ECE', data: result }; resdata.push(data); return do_anlyz_grade(5);
            }).then((result) => {
                let data = { title: 'CSE', data: result }; resdata.push(data);
                res.send({ Status: true, desc: result_data.Description, data: resdata })
            }).catch((e) => {
                res.send({ Status: false, msg: 'Somthing Went Wrong' })
            })
        } else {
            var resdata = [];
            do_anlyz(2).then((result) => {
                let data = { title: 'EEE', data: result }; resdata.push(data); return do_anlyz(3);
            }).then((result) => {
                let data = { title: 'MECH', data: result }; resdata.push(data); return do_anlyz(4);
            }).then((result) => {
                let data = { title: 'ECE', data: result }; resdata.push(data); return do_anlyz(5);
            }).then((result) => {
                let data = { title: 'CSE', data: result }; resdata.push(data);
                res.send({ Status: true, desc: result_data.Description, data: resdata })
            }).catch((e) => {
                res.send({ Status: false, msg: 'Somthing Went Wrong' })
            })
        }
    })
})
// exports.tokens = tokens;
module.exports = { router, tokens };
