import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonService } from '../common.service'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck{
  constructor(private commomservice:CommonService, private router:Router , private http:HttpClient) {}
  ngOnInit() {
  }
  ngDoCheck() {}
  logintype='College';
  loginerror;
  
  change_login_type(id,removeid,logintype){
    this.logintype=logintype;
    document.getElementById(removeid).className='col-sm-6 login-type';
    document.getElementById(id).className='col-sm-6 login-type active';
  }  
  login(f:NgForm){
    if(this.logintype=='Student') {
      this.router.navigateByUrl("/studentdashboard/sdashboard");
    } else if(this.logintype=='College') {

      console.log(f.value);
      this.http.post(`${this.commomservice.apiurl}/login_college_users` ,{username:f.value.username , password:f.value.password}).subscribe((result:any)=>{
        if(result.status===true){
          localStorage.setItem('collegename', result.data.college.name);
          localStorage.setItem('username', result.data.username);
          this.router.navigateByUrl("/collegedashboard/cdashboard");
        } else {
          this.loginerror=result.msg;
        }
      },(e)=>{
        this.router.navigateByUrl("/login");
      })

    }
  }
  signup(){
    if(this.logintype=='Student') {
      this.router.navigateByUrl("/signupStudent");
    } else if(this.logintype=='College') {
      this.router.navigateByUrl("/signupcollege");
    }
  }
}
