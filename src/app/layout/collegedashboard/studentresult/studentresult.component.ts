import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-studentresult',
  templateUrl: './studentresult.component.html',
  styleUrls: ['./studentresult.component.css']
})
export class StudentresultComponent implements OnInit {
  resultarray:Array<any>=[1,2,3,4];
  resulttable=false;
  constructor() { }
  ngOnInit() {
  }
  checkresult(form:NgForm){
    console.log(form.value.id);
    console.log(form);
    this.resulttable=true;
  }
}
