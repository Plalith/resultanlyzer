import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';
import { Promise } from 'es6-promise';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.css']
})
export class ResultlistComponent implements OnInit {

  constructor(private router:Router,private coms:CommonService,private http:HttpClient,private ngZone:NgZone) { }

  ngOnInit() {
    this.get_all_reults_list();
    this.showview=true;
  }
  showview:Boolean;
  resultlist:Array<any>=[];
  result_data:any;
  
  //Change Div
  changediv(){
    this.ngZone.run(()=> this.showview=true);
  }  


  // get list of all results
  get_all_reults_list(){
    this.http.get(`${this.coms.apiurl}/get_all_reults_list`).subscribe((result:any)=>{
      this.resultlist=result;
    })
  }

  // get result data
  get_result_data(id){
    console.log(this.showview)
    return new Promise((resolve,reject)=>{
      this.http.post(`${this.coms.apiurl}/get_result_data`,{id:id}).subscribe((result:any)=>{
        console.log(result);
        this.result_data=result;
        console.log(this.result_data);
        resolve();
      });
    }).then((result)=>{
      console.log('yes');
      this.ngZone.run(()=> this.showview=false);
      console.log(this.showview)
      
    });
  }
}
