import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';
import { Promise } from 'es6-promise';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private router: Router, private coms: CommonService, private http: HttpClient, private ngZone: NgZone) { }
  showview: Boolean;
  studentslist: Array<any> = [];
  result_data: any;
  ngOnInit() {
    this.get_all_students_list();
    this.showview = true;
  }
  changediv() {
    this.ngZone.run(() => this.showview = true);
  }
  // get list of all results
  get_all_students_list() {
    this.http.get(`${this.coms.apiurl}/get_all_students_list`).subscribe((result: any) => {
      if (result.status == true) {
        console.log(result);
        this.studentslist = result.data;
      }
    })
  }
  // get result data
  get_student_data(id) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.coms.apiurl}/get_student_data`, { id: id }).subscribe((result: any) => {
        this.result_data = result.data;
        console.log(this.result_data);
        resolve();
      });
    }).then((result) => {
      this.ngZone.run(() => this.showview = false);
    });
  }
  remove_student_data(id) {
    this.http.post(`${this.coms.apiurl}/remove_student_data`, { id: id }).subscribe((result: any) => {
      if(result.status===true){
        this.ngZone.run(()=> this.studentslist = result.data);
      }
    });
  }
}
