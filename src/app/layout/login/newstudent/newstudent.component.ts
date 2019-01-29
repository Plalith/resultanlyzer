import { Component, OnInit, NgZone,HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../common.service';
import { Promise } from 'es6-promise'
import { Router } from '@angular/router';

@Component({
  selector: 'app-newstudent',
  templateUrl: './newstudent.component.html',
  styleUrls: ['./newstudent.component.css']
})
export class NewstudentComponent implements OnInit {

  constructor(private http: HttpClient, private coms: CommonService, private router: Router, private ngZone: NgZone) { }
  colleges: Array<any>;
  passwordsmatch = 0;
  studentdata;
  otp_screen=false;
  otp_id='';
  otpvalid=0;
  error_msg='Please Try After Somtime';
  ngOnInit() {
    this.getcollegenames();
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
    this.http.get(`${this.coms.apiurl}/get_selected_coleges_names`).subscribe((result: any) => {
      if (result.status === true) {
        this.colleges = result.data;
      }
    });
  }
  signup(f:NgForm){
    this.studentdata=f.value;
    this.open_subscreen('confirm_details');

  }
  checkduplicaton(){
    this.http.post(`${this.coms.apiurl}/checkduplicaton`,{student:this.studentdata}).subscribe((result: any) => {
      if (result.status === true) {
        this.close_subscreen();
        this.send_otp();
      } else {
        this.error_msg=result.msg;
        this.close_subscreen();
        this.open_subscreen('error');
      }
    },(e)=>{
      this.close_subscreen();
        this.open_subscreen('error');
    });
  }
  send_otp(){
    this.http.get(`https://2factor.in/API/V1/b8a8551b-6f8d-11e8-a895-0200cd936042/SMS/+91${this.studentdata.contactno}/AUTOGEN`).subscribe((res:any)=>{
      if(res.Status==='Success') {
        this.otp_screen=true;
        this.otp_id=res.Details;
        this.close_subscreen();
      }
    });
  }
  validate_otp(f:NgForm){
    this.http.get(`https://2factor.in/API/V1/b8a8551b-6f8d-11e8-a895-0200cd936042/SMS/VERIFY/${this.otp_id}/${f.value.otp}`).subscribe((res:any)=>{
      console.log(res);
      if(res.Status=='Success'){
        let student1={
          id:this.studentdata.username,
          Name:this.studentdata.s_name,
          college:this.studentdata.collegename,
          mobile:this.studentdata.contactno,
          address:this.studentdata.address,
          email:this.studentdata.email,
          password:this.studentdata.password2,
          payment:'Not_Done',
          payment_date:new Date()
        }
        this.http.post(`${this.coms.apiurl}/insert_user_student`,{student:student1}).subscribe((res:any)=>{
          if(res.status==true){
            this.open_subscreen('signup');
            setTimeout(() => {
            this.router.navigateByUrl('/login');
            }, 2000);
          }
        });
        console.log(student1);
      } else {
        this.otpvalid=1;
      }
    },(e)=>{
      this.otpvalid=1;
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
      // Sub Scren initilization end
}
