import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newcollege',
  templateUrl: './newcollege.component.html',
  styleUrls: ['./newcollege.component.css']
})
export class NewcollegeComponent implements OnInit {

  constructor(private http:HttpClient) { }
  colleges:Array<any>;
  ngOnInit() {
    this.getcollegenames();
  }
  signup(f:NgForm){
    console.log(f);
  }
 

  fileReaded;
  csv2Array(fileInput: any){
    //read file from input
    this.fileReaded = fileInput.target.files[0];
    
    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);
    
     reader.onload = (e) => {
     let csv: any = reader.result;
     let allTextLines = csv.split(/\r|\n|\r/);
     let headers = allTextLines[0].split(',');
     let lines = [];
    
      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length === headers.length) {
          let tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
    
         // log each row to see output 
        //  console.log(tarr);
         var newobj = {
          Collge_Name:tarr[0],
          State: tarr[1],
          District: tarr[2],
          City: tarr[3] 
         }
         console.log(newobj);
         lines.push(newobj);
        }
      }
      console.log(">>>>>>>>>>>>>>>>>", lines);
    } 
  }
    getcollegenames(){
      this.http.get('http://localhost:3000/api/get_coleges_names').subscribe((result:any)=>{
      this.colleges=result;
      });
    }

}
