import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkresult',
  templateUrl: './checkresult.component.html',
  styleUrls: ['./checkresult.component.css']
})
export class CheckresultComponent implements OnInit {
resultarray:Array<any>=[1,2,3,4];
  constructor() { }

  ngOnInit() {
  }

}
