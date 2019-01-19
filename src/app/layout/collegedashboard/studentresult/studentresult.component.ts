import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-studentresult',
  templateUrl: './studentresult.component.html',
  styleUrls: ['./studentresult.component.css']
})
export class StudentresultComponent implements OnInit {
  resultarray:Array<any>=[];
  resulttable=false;
  constructor(private coms:CommonService,private http:HttpClient) { }
  ngOnInit() {
  }
  resultnotfound:boolean=false;
  checkresult(form:NgForm){
    this.http.post(`${this.coms.apiurl}/get_student_result`,{clg_uname:localStorage.getItem('username'),stu_id:form.value.id}).subscribe((result:any)=>{
      console.log(result);
      if(result.status==true){
        this.resultarray=result.data;
        this.resulttable=true;
        let checked=false;
        for(let check=0; check<result.data.data.length; check++){
          if(result.data.data[check].data.length<=0){
            this.resultnotfound=true;
          } else {
            this.resultnotfound=false;
            break;
          }
        }
      } else {
        console.log('server error');
      }
    },(e)=>{
      this.resulttable=false;
      console.log('server error');
    })
  }
}
