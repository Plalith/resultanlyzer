import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Promise } from 'es6-promise';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-uploadresult',
  templateUrl: './uploadresult.component.html',
  styleUrls: ['./uploadresult.component.css']
})
export class UploadresultComponent implements OnInit {

  constructor(private http:HttpClient, private coms:CommonService ) { }

  ngOnInit() {
  }
  result_type="";
  csvdata_isvaid:boolean=false;
  csvheaders:Number=0;
  progress_bar:Number=0;
  csvdata;

  uploadresult(f:NgForm) {
    console.log(f.value);
    var popup = document.getElementById('data_val_re');
    this.progress_bar=20;
    popup.style.display='block';
    var batch;
    var is_anlyse;
    new Promise((resolve,reject)=>{
        if(f.value.result_year==null){
          reject('Please Fill Details');
        } else {
          resolve();
        }
    }).then((result)=>{
      new Promise((resolve,reject)=>{
        if(f.value.batch==undefined){
          batch = false; is_anlyse = false;
        } else {
          batch = f.value.batch; is_anlyse = true;
        }
        this.progress_bar=40;
        resolve();
      })
    }).then((result)=>{
      return new Promise((resolve,reject)=>{
        if(this.testdata(f.value.grade)){
          document.getElementById('progress_bar').style.width='60%';
          resolve();
        } else {
          setTimeout(() => {
            if(this.testdata(f.value.grade)){
              document.getElementById('progress_bar').style.width='60%';
              resolve();
            } else {
              reject('Invalid CSV File. Please Upload Valid CSV File');
            }
          }, 2000);
        }
      })
    }).then(()=>{
      return new Promise((resolve,reject)=>{
        var result_data = {
          course: f.value.course,
          grade: f.value.grade,
          month: f.value.month,
          result_year: f.value.result_year,
          rtype: f.value.rtype,
          sem: f.value.sem,
          year: f.value.year,
          semcode:`${f.value.result_year}${f.value.sem}`,
          Description:`Results For ${f.value.result_year}-${f.value.sem} ${f.value.rtype} Examinations ${f.value.month} ${f.value.year}`,
          data:this.csvdata,
          college:localStorage.getItem('username'),
          analysis:is_anlyse,
          batch:f.value.batch

        }
        this.http.post(`${this.coms.apiurl}/upload_result_data`, {data:result_data}).subscribe((result:any)=>{
          console.log(result);
          if(result.status==true){
            document.getElementById('progress_bar').style.width='80%';
            resolve(result.msg);
          } else {
            reject(result.msg);
          }
        },(e)=>{
          reject('Error With server Please Try Again');
        });
      })
    }).then((result)=>{
      document.getElementById('progress_bar').style.width='100%';
      document.getElementById('uplode_error').innerHTML='';
      document.getElementById('uplode_success').innerHTML=`<span  style="padding: 9px;background-color: green;border-radius: 50%;color: white;"  class="glyphicon glyphicon-ok"></span> ${result}`
      // f.reset();
      setTimeout(() => {
      popup.style.display='none';
      this.progress_bar=0;
      }, 1500);
    })
    .catch((e)=>{
      document.getElementById('progress_bar').style.width='100%';
      document.getElementById('uplode_success').innerHTML='';
      document.getElementById('uplode_error').innerHTML=`<span  style="padding: 9px;background-color: red;border-radius: 50%;color: white;"  class="glyphicon glyphicon-remove"></span> ${e}`;
      setTimeout(() => {
        popup.style.display='none';
        this.progress_bar=0;
      }, 1500);
      // f.reset();
    });
  }
  testdata(pm1){
    if(this.csvdata_isvaid==true && (this.csvheaders==5 && pm1==true) || (this.csvheaders==6 && pm1=='')) {
      return true;
    } else {
      return false;
    }
  }
  getbatch() {
    if(this.result_type=='Regular/Supplementary') {
      return false;
    } else {
      return true;
    }
  }


  csv2Array(fileInput: any){
    //read file from input
    var fileReaded = fileInput.target.files[0];
    if(fileReaded.name.split('.').slice(-1)[0]=='csv' || fileReaded.name.split('.').slice(-1)[0]=='CSV') {
      let reader: FileReader = new FileReader();
      reader.readAsText(fileReaded);
      reader.onload = (e) => {
        let csv: any = reader.result;
        let allTextLines = csv.split(/\r|\n|\r/);
        let headers = allTextLines[0].split(',');
        let lines = [];
        console.log(headers.length,'headers');

        if(!headers.includes('') && headers.length==5){
          this.csvheaders=headers.length;
          new Promise((resolve,rejct)=>{
            for (let i = 0; i < allTextLines.length; i++) {
              // split content based on comma
              let data = allTextLines[i].split(',');
              if (data.length === headers.length) {
                let tarr = [];
                for (let j = 0; j < headers.length; j++) {
                  tarr.push(data[j]);
                }
                // log each row to see output 
                var newobj = {
                  rollno:tarr[0],
                  subcode: tarr[1],
                  subname: tarr[2],
                  grade: tarr[3],
                  credits: tarr[4],
                }
                lines.push(newobj);
              }
            }
            resolve();
          }).then(()=>{
            console.log(lines);
            this.csvdata=lines;
            this.csvdata_isvaid=true;
          });
        } else if(!headers.includes('') && headers.length==6){
          this.csvheaders=headers.length;
          new Promise((resolve,rejct)=>{
            for (let i = 0; i < allTextLines.length; i++) {
              // split content based on comma
              let data = allTextLines[i].split(',');
              if (data.length === headers.length) {
                let tarr = [];
                for (let j = 0; j < headers.length; j++) {
                  tarr.push(data[j]);
                }
                // log each row to see output 
                var newobj = {
                  rollno:tarr[0],
                  subcode: tarr[1],
                  subname: tarr[2],
                  internals: tarr[3],
                  externals: tarr[4],
                  credits: tarr[5],
                }
                lines.push(newobj);
              }
            }
            resolve();
          }).then(()=>{
            console.log(lines);
            this.csvdata=lines;
            this.csvdata_isvaid=true;
          });
        } else {
          this.csvheaders=0;
          this.csvdata_isvaid=false;
          console.log('Please Check Data in CSV file');
        }
      } 
    } else {
      this.csvheaders=0;
      this.csvdata_isvaid=false;
      console.log('Please Upload CSV file');
    }
  }
}
