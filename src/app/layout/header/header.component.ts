import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private commomservice:CommonService) { }

  ngOnInit() {
  }
  student_login() {
    this.commomservice.logintype="Student Login";
  }
  college_login() {
    this.commomservice.logintype="College Area";
  }
}
