import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collegemenu',
  templateUrl: './collegemenu.component.html',
  styleUrls: ['./collegemenu.component.css']
})
export class CollegemenuComponent implements OnInit {

  constructor(private coms:CommonService,private http:HttpClient,private router:Router) { }

  ngOnInit() {

  }
  logout(){
    this.http.get(`${this.coms.apiurl}/logout`).subscribe((result)=>{
      localStorage.removeItem('u_d');
      this.router.navigateByUrl("/login");
    },(e)=>{
      this.router.navigateByUrl("/login");
    });
  }
}
