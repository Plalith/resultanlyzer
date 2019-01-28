import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../common.service';
import { Promise } from 'es6-promise';
@Component({
  selector: 'app-addstudents',
  templateUrl: './addstudents.component.html',
  styleUrls: ['./addstudents.component.css']
})
export class AddstudentsComponent implements OnInit {

  constructor(private http: HttpClient, private cm: CommonService) { }
  type = "csv";
  csvdata_isvaid: boolean = false;
  csvheaders: Number = 0;
  csvdata;
  ngOnInit() {
  }

  addstudent_csv(f: NgForm) {
    var stu_obj = {
      college: JSON.parse(localStorage.getItem('u_d')).username,
      batch: f.value.batch,
      branch: f.value.branch,
      section: f.value.section,
      u_desc: `${JSON.parse(localStorage.getItem('u_d')).username}-${f.value.batch}-${f.value.branch}-${f.value.section}`,
      students: this.csvdata
    }
    if (this.csvdata_isvaid == true) {
      this.http.post(`${this.cm.apiurl}/add_student_man`, { student: stu_obj }).subscribe((result: any) => {
        if (result.status === true) {
          this.success();
          f.reset();
        } else {
          this.error();
        }
      }, (e) => {
        this.error();
      });
    } else {
      this.error();
    }

  }
  error() {
    document.getElementById('uplode_success').innerHTML = '';
    document.getElementById('uplode_error').innerHTML = `<span  style="padding: 9px;background-color: red;border-radius: 50%;color: white;"  class="glyphicon glyphicon-remove"></span> Please Check Uploaded CSV File.`;
  }
  success() {
    document.getElementById('uplode_error').innerHTML = '';
    document.getElementById('uplode_success').innerHTML = `<span  style="padding: 9px;background-color: green;border-radius: 50%;color: white;"  class="glyphicon glyphicon-ok"></span> Successfully Added Students`
  }
  uploadStudentman(f: NgForm) {
    var stu_obj = {
      college: JSON.parse(localStorage.getItem('u_d')).username,
      batch: f.value.batch,
      branch: f.value.branch,
      section: f.value.section,
      u_desc: `${JSON.parse(localStorage.getItem('u_d')).username}-${f.value.batch}-${f.value.branch}-${f.value.section}`,
      students: [{
        rollno: f.value.rollno,
        student_name: f.value.sname,
        father_name: f.value.fname
      }]
    }
    this.http.post(`${this.cm.apiurl}/add_student_man`, { student: stu_obj }).subscribe((result: any) => {
      if (result.status === true) {
        this.success();
        f.reset();
      } else { this.error(); }
    }, (e) => {
      this.error();
    });
  }
  changetype(v) {
    document.getElementById('uplode_error').innerHTML = '';
    document.getElementById('uplode_success').innerHTML = '';
    this.type = v;
  }
  csv2Array(fileInput: any) {
    //read file from input
    var fileReaded = fileInput.target.files[0];
    if (fileReaded.name.split('.').slice(-1)[0] == 'csv' || fileReaded.name.split('.').slice(-1)[0] == 'CSV') {
      let reader: FileReader = new FileReader();
      reader.readAsText(fileReaded);
      reader.onload = (e) => {
        let csv: any = reader.result;
        let allTextLines = csv.split(/\r|\n|\r/);
        let headers = allTextLines[0].split(',');
        let lines = [];
        if (!headers.includes('') && headers.length == 3) {
          this.csvheaders = headers.length;
          new Promise((resolve, rejct) => {
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
                  rollno: tarr[0],
                  student_name: tarr[1],
                  father_name: tarr[2],
                }
                lines.push(newobj);
              }
            }
            resolve();
          }).then(() => {
            console.log(lines);
            this.csvdata = lines;
            this.csvdata_isvaid = true;
          });
        } else {
          this.csvheaders = 0;
          this.csvdata_isvaid = false;
          console.log('Please Check Data in CSV file');
        }
      }
    } else {
      this.csvheaders = 0;
      this.csvdata_isvaid = false;
      console.log('Please Upload CSV file');
    }
  }
}
