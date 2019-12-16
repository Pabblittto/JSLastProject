import { Book } from './../Models/Book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css']
})
export class BookCollectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  BookCollection:Book[]=[];

  HiddenSortPanel:boolean=true;
  HiddenSearchPanel:boolean=true;

  SortBtnClick(){
    this.HiddenSortPanel = !this.HiddenSortPanel;
  }

  SearchBtnClick(){
    this.HiddenSearchPanel = !this.HiddenSearchPanel;
  }

}
