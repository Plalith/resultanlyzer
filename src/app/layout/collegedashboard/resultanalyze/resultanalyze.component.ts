import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resultanalyze',
  templateUrl: './resultanalyze.component.html',
  styleUrls: ['./resultanalyze.component.css']
})
export class ResultanalyzeComponent implements OnInit {

  constructor() { }
  resulttable=false;
  resultarray=['CSE','ECE','EEE','MECH','CIVIL']
  ngOnInit() {
  }
  analyze(form:NgForm) {
    console.log(form);
    console.log(form.value.id);
    this.resulttable=true;
  }
  public pieChartLabels:string[] = ['Passed', 'Failed'];
  public pieChartData:number[] = [80, 30];
  public pieChartType:string = 'pie';

  
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Passed'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Failed'}
  ];
 
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
