import { ConnectionService } from '../../services/connection.service';
import { Publisher } from '../../Models/Publisher';
import { Author } from '../../Models/Author';
import { Book } from '../../Models/Book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(
    private route:ActivatedRoute, 
    private location:Location,
    private connection:ConnectionService,
    private notifications:NotificationService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.BookId=parseInt(params.get('id'));
      if(Number.isNaN(this.BookId)){
        this.WrongId=true;
        this.notifications.AddMessage("Entered Id in URL is not a number!!");
      }
      else{
        this.DownloadBook();
      }
    })
  }

  WrongId:boolean=false;
  BookId:number;
  CertainBook:Book={ genre:"",id:undefined,publisherId:undefined,title:"",releaseDate:""};
  AuthorList:Author[];
  BookPublisher:Publisher={id:undefined,city:"",name:"",phoneNumber:1};

  WrongIdNumber(){
    this.WrongId=true;
    this.CertainBook={id:undefined,genre:"Unknown",releaseDate:"Unknown",title:"Unknown",publisherId:undefined};
  }


  DownloadBook(){
    this.WrongId=false;
    this.connection.GetCertainBook(this.BookId).subscribe(
      res=>{
        this.CertainBook=res;
        this.connection.GetCertainPublisher(res.publisherId).subscribe(
          res=>{
            this.BookPublisher=res;
          },
          err=>{
            this.BookPublisher={name:"Not Found :c",city:"",phoneNumber:undefined,id:1};
          }
        );
      },
      (err:HttpErrorResponse)=>{
        this.notifications.AddMessage("There is no book with certain Id!");
        this.WrongIdNumber();
      }
      
    )
  }

  BackBtnClick(){
    this.location.back();
  }

  EditBtnClick(){
    
  }


}
