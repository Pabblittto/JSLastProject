import { Book } from './../Models/Book';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-list-element',
  templateUrl: './book-list-element.component.html',
  styleUrls: ['./book-list-element.component.css']
})
export class BookListElementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() ThisBook:Book;

}
