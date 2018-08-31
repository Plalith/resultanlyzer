import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: ['./resultlist.component.css']
})
export class ResultlistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  resultlist:Array<any>=[
    'Results For III B.TECH I Semester Recounting/Revaluation Examinations May-2018(Marks)',
    'Results For IV B.TECH II Semester Supplementary Examinations Jul-2018(Marks)',
    'Results For II B.TECH II Semester Recounting/Revaluation Examinations Apr-2018(Grade)',
    'Results For II B.TECH II Semester Recounting/Revaluation Examinations Apr-2018(Marks)',
    'Results For I B.TECH II Semester Regular/Supplementary Examinations May-2018(Grade)',
    'Results For III B.TECH II Semester Recounting/Revaluation Examinations Apr-2018(Marks)',
    'Results For I B.TECH I Semester Supplementary Examinations May-2018(Marks)',
    'Results For I B.TECH I Semester Supplementary Examinations May-2018(Grade)',
    'Results For I B.TECH II Semester Supplementary Examinations May-2018(Marks)',
    'Results For II B.TECH I Semester Supplementary Examinations May-2018(Marks)',
    'Results For II B.TECH I Semester Supplementary Examinations May-2018(Grade)'
  ];
}
