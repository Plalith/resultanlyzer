import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  
  // apiurl='https://resultrepo.com/api_connect';
  // apiurl='http://35.157.193.93/api/';
  apiurl='http://localhost/api_connect'
  
  logintype:String="Student";
  usermessage:String='';
  u_d;
  
}
