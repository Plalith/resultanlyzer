import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedbackreports',
  templateUrl: './feedbackreports.component.html',
  styleUrls: ['./feedbackreports.component.css']
})
export class FeedbackreportsComponent implements OnInit {

  constructor() { }
  hide=false;
  hidediv()  {
    this.hide=true;
  }
  ngOnInit() {
  }
  dummyarray=['','','','','','','','',''];
}
