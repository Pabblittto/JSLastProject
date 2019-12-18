import { Author } from './../../Models/Author';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }

  NewAuthor:Author=new Author();
  
  BackBtnClick(){
    this.location.back();
  }

}
