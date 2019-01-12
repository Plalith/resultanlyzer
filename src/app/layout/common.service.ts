import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  
  apiurl='http://35.157.193.93/api/';
  
  logintype:String="Student";

  usermessage:String='';
  
}
