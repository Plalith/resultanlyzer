import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collegedashboard',
  templateUrl: './collegedashboard.component.html',
  styleUrls: ['./collegedashboard.component.css']
})
export class CollegedashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.collegename= JSON.parse(localStorage.getItem('u_d')).c_name;
  }
  collegename;
}
