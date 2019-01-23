import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-addstudents',
  templateUrl: './addstudents.component.html',
  styleUrls: ['./addstudents.component.css']
})
export class AddstudentsComponent implements OnInit {

  constructor(private http:HttpClient,private cm:CommonService) { }
  type="csv";
  ngOnInit() {
  }
  uploadStudentscsv(f:NgForm){
    
    console.log(f.value);
  }
  uploadStudentman(f:NgForm){
    var stu_obj={
      college:JSON.parse(localStorage.getItem('u_d')).username,
      batch:f.value.batch,
      branch:f.value.branch,
      section:f.value.section,
      u_desc:`${JSON.parse(localStorage.getItem('u_d')).username}-${f.value.batch}-${f.value.branch}-${f.value.section}`,
      students:[{
        rollno:f.value.rollno,
        student_name:f.value.sname,
        father_name:f.value.fname
      }]
    }
    this.http.post(`${this.cm.apiurl}/add_student_man`,{student:stu_obj}).subscribe((result)=>{
      console.log(result);
    })
  }
  changetype(v){
    this.type=v;
  }
}
