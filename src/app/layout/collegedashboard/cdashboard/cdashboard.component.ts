import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cdashboard',
  templateUrl: './cdashboard.component.html',
  styleUrls: ['./cdashboard.component.css']
})
export class CdashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

// Past year passpercentage
  lineChartData:Array<any> = [
    [0,65, 59, 80, 81, 56, 55]
  ];
  public lineChartLabels:Array<any> = ['Pass Percentage', 2013,2014,2015,2016,2017,2018];

//  Student Usage
public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels:string[] = ['CSE', 'EEE', 'ECE', 'MECH', 'CIVIL', 'IT'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;
public barChartData:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Active'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'In-Active'}
];

// Click Actions
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
