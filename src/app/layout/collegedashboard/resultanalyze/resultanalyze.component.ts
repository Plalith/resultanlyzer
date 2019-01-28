import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resultanalyze',
  templateUrl: './resultanalyze.component.html',
  styleUrls: ['./resultanalyze.component.css']
})
export class ResultanalyzeComponent implements OnInit {

  constructor(private coms:CommonService,private http:HttpClient) { }
  resulttable=false;
  resultarray=['CSE','ECE','EEE','MECH','CIVIL'];
  subjects=['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L'];
  resultlist=[];
  result_data=[];
  ngOnInit() {
    this.get_all_reults_list();
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
    // get list of all results
  get_all_reults_list(){
    this.http.get(`${this.coms.apiurl}/get_all_reults_list_for_analysis`).subscribe((result:any)=>{
      if(result.status===true){
        this.resultlist=result.data;
      }
    })
  }
  getpercent(t,c){
    return (t/c)*100;
  }
  analyze(form:NgForm) {
    this.http.post(`${this.coms.apiurl}/do_resultanlyz`,{id:form.value.id}).subscribe((result:any)=>{
      if(result.Status==true){
        this.barchartdata=[];
        this.pieChartData=[];
        this.c_r=[];
        this.overal_data=[];
        this.result_data=result;
        let c_r = {branches:[],data:[{data:[],label: 'Passed'},{data:[],label: 'Failed'}]}
        for (let index = 0; index < result.data.length; index++) {
          let grapobj = {subjects:[],data:[{data:[],label: 'Passed'},{data:[],label: 'Failed'}],sub_names:[]}
          for(let sub=0; sub < result.data[index].data.subwise.length; sub++) {
            grapobj.subjects.push(this.subjects[sub]);
            grapobj.sub_names.push(result.data[index].data.subwise[sub].sub_name);
            grapobj.data[0].data.push(result.data[index].data.subwise[sub].passed)
            grapobj.data[1].data.push(result.data[index].data.subwise[sub].failed)
          }
          c_r.branches.push(result.data[index].title);
          c_r.data[0].data.push(result.data[index].data.overal.passed);
          c_r.data[1].data.push(result.data[index].data.overal.failed);
          this.overal_data.push(result.data[index].data.overal);
          this.c_r.push(c_r);
          this.barchartdata.push(grapobj);
          this.pieChartData.push({data:[result.data[index].data.overal.passed,result.data[index].data.overal.failed]});
        }
      }
      this.resulttable=true;
    })
  }
  overal_data=[];
  public c_r=[];
  public pieChartLabels:string[] = ['Passed', 'Failed'];
  public pieChartData = [];
  public pieChartType:string = 'pie';
  public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barchartdata = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 A:{
   one:'yes';
 }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  print(id){
    var ele = document.getElementById(id).innerHTML;
    var og = document.body.innerHTML;
    document.body.innerHTML = ele;
    window.print();
    document.body.innerHTML = og;
  }
}
