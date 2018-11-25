import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  
  apiurl='http://localhost:3000/api/';
  
  logintype:String="Student";

  usermessage:String='';
  
}
