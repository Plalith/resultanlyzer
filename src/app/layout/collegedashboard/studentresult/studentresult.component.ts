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
  resultarray: any = [];
  resulttable = false;
  resultnotfound: boolean = false;
  percent: any = 0;
  constructor(private coms: CommonService, private http: HttpClient) { }
  ngOnInit() {
  }
  async getpercentage() {
    let percentage = 0;
    let count=0;
    let grade;
    for (let sem = 0; sem < await this.resultarray.data.length; sem++) {
      if (this.resultarray.data[sem].data.length > 0) {
        if(this.resultarray.data[sem].total_credits===false){
          percentage = percentage + (await (this.resultarray.data[sem]).o_c_w_f);
          grade=false;
        } else {
          percentage = percentage + (await (this.resultarray.data[sem]).o_c_w_f / await (this.resultarray.data[sem]).total_credits);
          grade=true;
        }
        count++;
      }
    }
    if(grade===true){
      return {value:(await percentage/await count)*10, grade:true};
    } else {
      return {value:await percentage,grade:false};
    }
  }
  checkresult(form: NgForm) {
    this.http.post(`${this.coms.apiurl}/get_student_result`, { clg_uname: JSON.parse(localStorage.getItem('u_d')).username, stu_id: form.value.id }).subscribe((result: any) => {
      console.log(result);
      if (result.status == true) {
        this.resultarray = result.data;
        this.getpercentage().then((result) => { this.percent = result });
        this.resulttable = true;
        let checked = false;
        for (let check = 0; check < result.data.data.length; check++) {
          if (result.data.data[check].data.length <= 0) {
            this.resultnotfound = true;
          } else {
            this.resultnotfound = false;
            break;
          }
        }
      } else {
        console.log('server error');
      }
    }, (e) => {
      this.resulttable = false;
      console.log('server error');
    });
  }
}
