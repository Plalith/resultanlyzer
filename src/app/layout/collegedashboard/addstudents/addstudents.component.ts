import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addstudents',
  templateUrl: './addstudents.component.html',
  styleUrls: ['./addstudents.component.css']
})
export class AddstudentsComponent implements OnInit {

  constructor() { }
  type="csv";
  ngOnInit() {
  }
  uploadStudentscsv(f:NgForm){
    
    console.log(f.value);
  }
  uploadStudentman(f:NgForm){
    
    console.log(f.value);
  }
  changetype(v){
    this.type=v;
  }
}
