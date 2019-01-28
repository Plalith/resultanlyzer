import { Component, OnInit, NgZone} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../common.service';
import {Promise} from 'es6-promise'
import { Router } from '@angular/router';

@Component({
  selector: 'app-newcollege',
  templateUrl: './newcollege.component.html',
  styleUrls: ['./newcollege.component.css']
})
export class NewcollegeComponent implements OnInit {

  constructor(private http:HttpClient,private coms:CommonService,private router:Router,private ngZone:NgZone) {}
  colleges:Array<any>;
  user_avil=0;
  college_include=0;
  passwordsmatch=0;
  clg_ids=[];
  ngOnInit() {
    this.getcollegenames();
  }
  signup(f:NgForm){
    let userdata = new Promise((resolve, reject) => {
      var data={
        username:f.value.username,
        password:f.value.password2,
        college:{
            name:f.value.collegename,
            code:f.value.collegecode,
            reg_id:f.value.regid,
            le_id:f.value.leid,
            examcell_incharge:f.value.ecname
        },
        mobile:f.value.contactno,
        email:f.value.email,
        opt_ver:false,
        payment:{
            status:false
        }
      }
      resolve(data);
  });
  
  userdata.then((result)=>{
    this.http.post(`${this.coms.apiurl}/insert_user_college`,result).subscribe((result)=>{
      localStorage.setItem('userdata','hello');
      console.log(localStorage.getItem('userdata'));
    this.ngZone.run(() => this.router.navigate(['/collegedashboard/cdashboard']));
    f.reset();
    },(e)=>{
      this.ngZone.run(() => this.router.navigate(['/login']));
    });
  });

  }
  user_avalibility(e) {
    var username=e.target.value;
    if(username.length>=5){
      this.http.post(`${this.coms.apiurl}/get_c_user`,{'username':username}).subscribe((result)=>{
        if(result==null) {
          this.user_avil=0;
        } else {
          this.user_avil=1;
        }
      })
    }
  }
  include_college(e) {
    var collegename=e.target.value;
    console.log(collegename)
      this.http.post(`${this.coms.apiurl}/get_c_name`,{'collegename':collegename}).subscribe((result)=>{
        if(result==null) {
          this.college_include=0;
        } else {
          this.college_include=1;
        }
      })
  }
  check_password(p1,e){
    if(p1==e.target.value) {
      console.log('passwords matched');
      this.passwordsmatch=0;
    } else {
      this.passwordsmatch=1;
    }
  }


    getcollegenames(){
      this.http.get(`${this.coms.apiurl}/get_coleges_names`).subscribe((result:any)=>{
      this.colleges=result;
      });
    }

}
