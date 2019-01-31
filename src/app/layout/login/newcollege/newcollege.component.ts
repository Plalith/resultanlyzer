import { Component, OnInit, NgZone ,HostListener} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../common.service';
import { Promise } from 'es6-promise'
import { Router } from '@angular/router';

@Component({
  selector: 'app-newcollege',
  templateUrl: './newcollege.component.html',
  styleUrls: ['./newcollege.component.css']
})
export class NewcollegeComponent implements OnInit {

  constructor(private http: HttpClient, private coms: CommonService, private router: Router, private ngZone: NgZone) { }
  colleges: Array<any>;
  user_avil = 0;
  college_include = 0;
  passwordsmatch = 0;
  clg_ids = [];
  college_Data;
  otp_div=false;
  otpvalid=0;
  otp_id;
  ngOnInit() {
    this.getcollegenames();
  }
  confirm_deatails(f:NgForm){
    this.college_Data=f.value;
    this.open_subscreen('confirm_details');
  }
  sendotp(){
    this.http.get(`https://2factor.in/API/V1/b8a8551b-6f8d-11e8-a895-0200cd936042/SMS/+91${this.college_Data.contactno}/AUTOGEN`).subscribe((res:any)=>{
      if(res.Status==='Success') {
        this.otp_div=true;
        this.otp_id=res.Details;
        this.close_subscreen();
      }
    });
  }
  verifyotp(f:NgForm){
    this.http.get(`https://2factor.in/API/V1/b8a8551b-6f8d-11e8-a895-0200cd936042/SMS/VERIFY/${this.otp_id}/${f.value.otp}`).subscribe((res:any)=>{
      if(res.Status=='Success'){
        this.otpvalid=0;
        this.signup(this.college_Data);
      }
    },(e)=>{
      this.otpvalid=1;
    })
  }
  signup(f) {
    let userdata = new Promise((resolve, reject) => {
      var data = {
        username: f.username,
        password: f.password2,
        college: {
          name: f.collegename,
          code: f.collegecode,
          reg_id: f.regid,
          le_id: f.leid,
          examcell_incharge: f.ecname
        },
        mobile: f.contactno,
        email: f.email,
        opt_ver: false,
        payment: {
          status: false
        }
      }
      resolve(data);
    });
    userdata.then((result) => {
      this.http.post(`${this.coms.apiurl}/insert_user_college`, result).subscribe((result:any) => {
        localStorage.setItem('u_d', JSON.stringify(result.data));
        this.ngZone.run(() => this.router.navigate(['/collegedashboard/cdashboard']));
        f.reset();
      }, (e) => {
        this.ngZone.run(() => this.router.navigate(['/login']));
      });
    });

  }
  user_avalibility(e) {
    var username = e.target.value;
    if (username.length >= 5) {
      this.http.post(`${this.coms.apiurl}/get_c_user`, { 'username': username }).subscribe((result) => {
        if (result == null) {
          this.user_avil = 0;
        } else {
          this.user_avil = 1;
        }
      })
    }
  }
  include_college(e) {
    var collegename = e.target.value;
    console.log(collegename)
    this.http.post(`${this.coms.apiurl}/get_c_name`, { 'collegename': collegename }).subscribe((result) => {
      if (result == null) {
        this.college_include = 0;
      } else {
        this.college_include = 1;
      }
    })
  }
  check_password(p1, e) {
    if (p1 == e.target.value) {
      console.log('passwords matched');
      this.passwordsmatch = 0;
    } else {
      this.passwordsmatch = 1;
    }
  }


  getcollegenames() {
    this.http.get(`${this.coms.apiurl}/get_coleges_names`).subscribe((result: any) => {
      this.colleges = result;
    });
  }





       // Sub Screens
       subscreen_close = document.getElementById('dummy');
       // to open sub screen
       open_subscreen(id) {
           this.subscreen_close = document.getElementById(id);
           document.getElementById(id).classList.toggle('show');
       }
       // to close sub screen
       close_subscreen() {
           this.subscreen_close.classList.toggle('show');
           this.subscreen_close = document.getElementById('dummy');
       }
       // to close if click on any where out side
       @HostListener('click', ['$event']) clicked($event) {
           if ($event.target == this.subscreen_close) {
               this.close_subscreen();
           }
       }
}
