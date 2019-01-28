import { Component, OnInit, NgZone } from '@angular/core';
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
    this.http.post(`https://2factor.in/API/V1/b8a8551b-6f8d-11e8-a895-0200cd936042/SMS/+91${f.value.contactno}/AUTOGEN`,{c_no:f.value.contactno}).subscribe((res:any)=>{
      console.log(res);
      if(res.Status==='Success') {
        this.otp_screen=false;
        this.otp_id=res.Details;
      }
    },(e)=>{console.log(e)})
    console.log(f.value);
  }
  validate_otp(f:NgForm){
    this.http.post(`https://2factor.in/API/V1/b8a8551b-6f8d-11e8-a895-0200cd936042/SMS/VERIFY/${this.otp_id}/${f.value.otp}`,{}).subscribe((res)=>{
      console.log(res);
    })
  }
}
