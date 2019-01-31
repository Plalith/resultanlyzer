import { Component, OnInit,HostListener } from '@angular/core';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editclgprofile',
  templateUrl: './editclgprofile.component.html',
  styleUrls: ['./editclgprofile.component.css']
})
export class EditclgprofileComponent implements OnInit {

  constructor(private commomservice: CommonService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.college = JSON.parse(localStorage.getItem('u_d'));
  }
  college;
  entered_password;
  otp_id;
  changepassword(f: NgForm) {
    if (f.value.password === f.value.repassword) {
      this.http.get(`https://2factor.in/API/V1/b8a8551b-6f8d-11e8-a895-0200cd936042/SMS/+91${this.college.mobile}/AUTOGEN`).subscribe((result: any) => {
        if (result.Status === 'Success') {
          this.entered_password = f.value.password;
          this.otp_id = result.Details;
          document.getElementById('mismatch').innerHTML = '';
          this.close_subscreen();
          this.open_subscreen('otp_passwor');
          f.reset()
        }
      }, (e) => {
        document.getElementById('otp_error').innerHTML = 'Unable to send OTP, Please try After Sometime';
      });
    } else {
      document.getElementById('mismatch').innerHTML = 'Passwords Not Matched';
    }
  }
  validate_otp(f: NgForm) {
    this.http.get(`https://2factor.in/API/V1/b8a8551b-6f8d-11e8-a895-0200cd936042/SMS/VERIFY/${this.otp_id}/${f.value.otp}`).subscribe((res: any) => {
      if (res.Status === 'Success') {
        document.getElementById('otp_error').innerHTML = '';
        this.http.post(`${this.commomservice.apiurl}/clg_cng_psd`,{new_password:this.entered_password}).subscribe((result:any)=>{
          if(result.status==true){
            this.close_subscreen();
            f.reset();
            this.open_subscreen('p_changed');
            setTimeout(() => {
              this.close_subscreen();
            }, 3000);
          }else {
            this.close_subscreen();
            this.open_subscreen('p_changed_fail');
            setTimeout(() => {
              this.close_subscreen();
            }, 3000);
          }
        })
      } else {
        document.getElementById('otp_error').innerHTML = 'Invalid OTP';
      }
    }, (e) => {
      document.getElementById('otp_error').innerHTML = 'Invalid OTP';
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
      document.getElementById('otp_error').innerHTML = '';
      document.getElementById('mismatch').innerHTML = ''; // extra
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
