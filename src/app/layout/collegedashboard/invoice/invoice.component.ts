import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  Invoice:Array<any>=[
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
