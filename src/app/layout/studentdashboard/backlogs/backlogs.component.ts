import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backlogs',
  templateUrl: './backlogs.component.html',
  styleUrls: ['./backlogs.component.css']
})
export class BacklogsComponent implements OnInit {
  resultarray:Array<any>=[1,2,3,4];
  constructor() { }

  ngOnInit() {
  }

}
