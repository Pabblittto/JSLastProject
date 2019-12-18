import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ConnectionService } from './../../services/connection.service';
import { Author } from './../../Models/Author';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-author-list-element',
  templateUrl: './author-list-element.component.html',
  styleUrls: ['./author-list-element.component.css']
})
export class AuthorListElementComponent implements OnInit {

  constructor( private connection:ConnectionService,private router:Router) { }

  ngOnInit() {
    this.connection.GetObjectsForCertainAuthor(this.ThisAuthor.id).subscribe(
      res=>{
        this.BookNumber=res.length;
      },
      (err:HttpErrorResponse)=>{

      }
    )
  }

  @Input() ThisAuthor:Author;  

  BookNumber:number=0;

  DetailsBtnClick(){
    this.router.navigate([`authors/details/${this.ThisAuthor.id}`])
  }

}
