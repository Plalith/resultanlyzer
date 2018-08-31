import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-uploadresult',
  templateUrl: './uploadresult.component.html',
  styleUrls: ['./uploadresult.component.css']
})
export class UploadresultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  rtype="";
  uploadresult(f:NgForm) {
    console.log(f.value);
    console.log(f.valid);
  }
  getbatch() {
    if(this.rtype=='Regular/Supplementary') {
      return false;
    } else {
      return true;
    }
  }

}
