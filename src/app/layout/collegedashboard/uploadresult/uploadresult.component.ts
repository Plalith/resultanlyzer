import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uploadresult',
  templateUrl: './uploadresult.component.html',
  styleUrls: ['./uploadresult.component.css']
})
export class UploadresultComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  rtype="";
  uploadresult(f:NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this.http.post('http://localhost:300', {'name':f.value.ryear , 'sometid':f.value.course}).subscribe((result)=>{
      console.log(result);
    },(e)=>{
      console.log("Sorry api not found");
      console.log({'name':f.value.ryear , 'sometid':f.value.course});
    });
  }
  getbatch() {
    if(this.rtype=='Regular/Supplementary') {
      return false;
    } else {
      return true;
    }
    

  }

}
