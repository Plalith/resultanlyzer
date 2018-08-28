import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  changediv=true;
  password=false;
  mobile=false;
  otp=false;
  cpchild=true;
  fadedisplay=0;
  cnchild=true;
  changedivfn(varname) {
    this[varname]=!this[varname];
    this.changediv=!this.changediv;
    if(this[varname]===true){
      this.fadedisplay=100;
    } else {
      this.fadedisplay=0;
    }
  }
  changepassword(f:NgForm) {
    this.otp=true;
    this.cpchild=false;
    console.log(f.value);
  }
  changenumber(f){
    this.otp=true;
    this.cnchild=false;
    console.log(f.value);
  }
  validotp(f) {
    this.otp=false;
    this.cpchild=true;
    console.log(f.value);
  }
  validotpnum(f){
    this.otp=false;
    this.cnchild=true;
    console.log(f.value);
  }
}
