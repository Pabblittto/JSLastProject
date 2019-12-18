import { Location } from '@angular/common';
import { Book } from './../../Models/Book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(
    private location:Location
  ) { }

  ngOnInit() {
  }
  
  NewBook:Book={id:undefined,publisherId:undefined,title:"",releaseDate:"",genre:""};

  BackBtnClick(){
    this.location.back();
  }

  AddBookBtnClick(){
    alert("dodawanie trzeba dodać");
  }
}
