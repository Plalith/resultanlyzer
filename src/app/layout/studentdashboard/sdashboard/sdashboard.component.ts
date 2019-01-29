import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sdashboard',
  templateUrl: './sdashboard.component.html',
  styleUrls: ['./sdashboard.component.css']
})
export class SdashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.student=JSON.parse(localStorage.getItem('u_d'));
  }
  student;
}
