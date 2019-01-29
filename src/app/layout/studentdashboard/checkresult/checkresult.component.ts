import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkresult',
  templateUrl: './checkresult.component.html',
  styleUrls: ['./checkresult.component.css']
})
export class CheckresultComponent implements OnInit {
  constructor(private cms:CommonService,private http:HttpClient) { }
  resultarray:Array<any>=[];
  resulttable=false;
  resultnotfound:boolean=false;
  ngOnInit() {
    this.student=JSON.parse(localStorage.getItem('u_d'));
    this.http.get(`${this.cms.apiurl}/get_my_result`).subscribe((result:any)=>{
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
    });
  }
  student;
}
