import { NotificationService } from './../../services/notification.service';
import { Author } from './../../Models/Author';
import { Publisher } from './../../Models/Publisher';
import { ConnectionService } from './../../services/connection.service';
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
    private location:Location,
    private connection:ConnectionService,
    private notification:NotificationService
  ) { }

  ngOnInit() {
    this.connection.GetAuthorList().subscribe(      
      res=>{
        this.AuthorsList=[...res];
      },
      err=>{
        this.notification.AddMessage("Can not download authors from server, check log for details");
        console.log(err);
        
      });

    this.connection.GetPublishersList().subscribe(
      res=>{
        this.PublishersList=[...res];
      },
      err=>{
        this.notification.AddMessage("Can not download publishers from server, check log for details");
        console.log(err);
        
      }
      )
  }
  SelectedAuthor:string;
  
  PublishersList:Publisher[]=[];
  AuthorsList:Author[]=[];
  
  NewBook:Book={id:undefined,publisherId:undefined,title:"",releaseDate:"",genre:""};
  ChoosedAuthors:Author[]=[];

  BackBtnClick(){
    this.location.back();
  }

  AddBookBtnClick(){
    alert("dodawanie trzeba dodać");
  }

  AddAuthorClick(){
    
    if(this.SelectedAuthor!=""){
     console.log(this.SelectedAuthor);
     
      
    }
    
  }

}
