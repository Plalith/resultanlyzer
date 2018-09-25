import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adminfeedback',
  templateUrl: './adminfeedback.component.html',
  styleUrls: ['./adminfeedback.component.css']
})
export class AdminfeedbackComponent implements OnInit {

  constructor() { }
  subjects=['Subject','Subject','Subject','Subject','Subject','Subject'];
  dummyarray=['','','','','','','','','','','']
  ngOnInit() {
  }

  totalsubjects=this.subjects.length;
  delet_subject(i) {
    if(this.subjects.length>1) {
    this.subjects.splice(i,1);
    this.totalsubjects=this.subjects.length;
    }
  }
  addsubject() {
    this.subjects.push('Subject');
    this.totalsubjects=this.subjects.length;
  }

  Createform(f:NgForm) {
    console.log(f.value.year);
    console.log(f.value.Batch);
    console.log(f.value.Branch);
    console.log(f.value.Section);
    for(var i=0; i<this.subjects.length; i++){
      console.log(f.value[this.subjects[i]+i])
    }
    f.reset();
    this.subjects=['Subject','Subject','Subject','Subject','Subject','Subject'];
    this.totalsubjects=this.subjects.length;

  }
  

}
