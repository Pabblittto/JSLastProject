import { ConnectionService } from './../services/connection.service';
import { Publisher } from './../Models/Publisher';
import { Author } from './../Models/Author';
import { Book } from './../Models/Book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private location:Location,private connection:ConnectionService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.BookId=parseInt(params.get('id'));
      if(Number.isNaN(this.BookId)){
        this.WrongIdNumber();
      }
      else{
        this.DownloadBook();
      }
    })
  }

  WrongId:boolean=false;
  BookId:number;
  CertainBook:Book;
  AuthorList:Author[];
  BookPublisher:Publisher;

  WrongIdNumber(){
    this.WrongId=true;
  }


  DownloadBook(){
    this.WrongId=false;
    alert("zaimplementować pobieranie obiektu ze ");
  }

  BackBtnClick(){
    this.location.back();
  }


}
