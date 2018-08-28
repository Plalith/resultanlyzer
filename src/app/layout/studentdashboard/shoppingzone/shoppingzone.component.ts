import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppingzone',
  templateUrl: './shoppingzone.component.html',
  styleUrls: ['./shoppingzone.component.css']
})
export class ShoppingzoneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  itemlist=true;
  discription={
    name:'Scientific Calculator',
    price:'350',
    contact_person:'Anand Samuel',
    mobileno:'9885215456',
    path: 'assets/images/shoppingitems/71U-FVX5szL._SY741_.jpg'
  };
  shoppingitems:Array<any>=[
    {
      name:'Scientific Calculator',
      price:'350',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'assets/images/shoppingitems/71U-FVX5szL._SY741_.jpg',
      description: 'Scientific Calculator working in perfect condition',
    },
    {
      name:'Drafter',
      price:'Free',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'https://rukminim1.flixcart.com/image/832/832/office-set/d/v/3/omega-1954-original-imadz44gvhzuhv8a.jpeg?q=70',
      description: 'Drafter for drawing working in perfect condition'
    },
    {
      name:'Aporn',
      price:'200',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'https://3.imimg.com/data3/ML/XS/ANDROID-12676552/lab-coat-250x250-250x250.jpg',
      description: 'Aporn for lab'
    },
    {
      name:'Engineering Mechanics text Book',
      price:'100',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'https://www.schandpublishing.com/uploads/bookimages/schand-books/9788121935722.jpg',
      description: 'Engineering Mechanics Text Book. 11th eddition'
    },
    {
      name:'Scientific Calculator',
      price:'350',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'assets/images/shoppingitems/71U-FVX5szL._SY741_.jpg',
      description: 'Scientific Calculator working in perfect condition',
    },
    {
      name:'Drafter',
      price:'Free',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'https://rukminim1.flixcart.com/image/832/832/office-set/d/v/3/omega-1954-original-imadz44gvhzuhv8a.jpeg?q=70',
      description: 'Drafter for drawing working in perfect condition'
    },
    {
      name:'Aporn',
      price:'200',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'https://3.imimg.com/data3/ML/XS/ANDROID-12676552/lab-coat-250x250-250x250.jpg',
      description: 'Aporn for lab'
    },
    {
      name:'Engineering Mechanics text Book',
      price:'100',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'https://www.schandpublishing.com/uploads/bookimages/schand-books/9788121935722.jpg',
      description: 'Engineering Mechanics Text Book. 11th eddition'
    },
    {
      name:'Scientific Calculator',
      price:'350',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'assets/images/shoppingitems/71U-FVX5szL._SY741_.jpg',
      description: 'Scientific Calculator working in perfect condition',
    },
    {
      name:'Drafter',
      price:'Free',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'https://rukminim1.flixcart.com/image/832/832/office-set/d/v/3/omega-1954-original-imadz44gvhzuhv8a.jpeg?q=70',
      description: 'Drafter for drawing working in perfect condition'
    },
    {
      name:'Aporn',
      price:'200',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'https://3.imimg.com/data3/ML/XS/ANDROID-12676552/lab-coat-250x250-250x250.jpg',
      description: 'Aporn for lab'
    },
    {
      name:'Engineering Mechanics text Book',
      price:'100',
      contact_person:'Anand Samuel',
      mobileno:'9885215456',
      path: 'https://www.schandpublishing.com/uploads/bookimages/schand-books/9788121935722.jpg',
      description: 'Engineering Mechanics Text Book. 11th eddition'
    },
  ]

  getdiscription(i) {
    this.discription=this.shoppingitems[i];
    this.itemlist=!this.itemlist;
  }
}
