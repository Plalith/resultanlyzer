import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonService } from '../common.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck{

  constructor(private commomservice:CommonService) { }

  ngOnInit() {
  }
  ngDoCheck() {
    this.logintype=this.commomservice.logintype;
    console.log("checked");
  }
  logintype=this.commomservice.logintype;

}
