import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonService } from '../common.service'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck{

  constructor(private commomservice:CommonService, private router:Router) { }

  ngOnInit() {
  }
  ngDoCheck() {
    this.logintype=this.commomservice.logintype;
    console.log("checked");
  }
  logintype=this.commomservice.logintype;

  login(f:NgForm){
    if(this.logintype=='Student Login') {
      this.router.navigateByUrl("/studentdashboard/sdashboard");
    } else if(this.logintype=='College Area') {
      this.router.navigateByUrl("/collegedashboard/cdashboard");
    }
  }
  signup(){
    if(this.logintype=='Student Login') {
      this.router.navigateByUrl("/signupStudent");
    } else if(this.logintype=='College Area') {
      this.router.navigateByUrl("/signupcollege");
    }
  }
}
