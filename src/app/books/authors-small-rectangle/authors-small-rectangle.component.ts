import { BookAuthor } from './../../Models/BookAuthor';
import { ConnectionService } from './../../services/connection.service';
import { Author } from './../../Models/Author';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-authors-small-rectangle',
  templateUrl: './authors-small-rectangle.component.html',
  styleUrls: ['./authors-small-rectangle.component.css']
})
export class AuthorsSmallRectangleComponent implements OnInit {

  constructor( private connection:ConnectionService) { }

  ngOnInit() {
    console.log(this.BookId);
    
    this.connection.GetObjectForCertainBook(this.BookId).subscribe(
      res=>{
        if(res.length==0){
          this.Authors=[{id:0,name:"No",surname:"Authors"}];
        }
        else{
          this.BookAuthorsObjects=[...res];
          this.Authors=[];
          for(let i=0;i<this.BookAuthorsObjects.length;i++){
            this.connection.GetCertainAuthor(this.BookAuthorsObjects[i].authorId).subscribe(
              res=>{
                this.Authors.push(res);
              },
              err=>{
                this.Authors.push({id:this.BookAuthorsObjects[i].authorId,name:"Unknown",surname:"Author"})
              })

          }
        }
      },
      err=>{
        console.log(err);
      }
    )
  }


  BookAuthorsObjects:BookAuthor[];
@Input() BookId:number;
  Authors:Author[]=[]

}
