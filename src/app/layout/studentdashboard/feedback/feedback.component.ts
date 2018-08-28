import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
subjects : Array<any>=['English','Operating System','Mechanics','C Programing','Chemistry','Metulargy',];
characterstics : Array<any>=[1,2,3,4,5,6];
feedback:Array<any>=[];
  constructor() { }

  ngOnInit() {
  }
  feedbacksubmit(form:NgForm) {
    for(var i=0; i<this.subjects.length; i++) {
      var data = {
        [this.subjects[i]] :{ 
          1:Number,
          2:Number,
          3:Number,
          4:Number,
          5:Number,
          6:Number,
        }
      }
      for(var j=0; j<this.characterstics.length; j++) {
        data[this.subjects[i]][j]=form.value[this.subjects[i]+this.characterstics[j]];
      }
      this.feedback.push(data);
    }
    form.reset();
  }
}
