import { Router } from '@angular/router';
import { BookAuthor } from './../../Models/BookAuthor';
import { NotificationService } from './../../services/notification.service';
import { Author } from './../../Models/Author';
import { Publisher } from './../../Models/Publisher';
import { ConnectionService } from './../../services/connection.service';
import { Location } from '@angular/common';
import { Book, Genres } from './../../Models/Book';
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
    private notification:NotificationService,
    private router:Router
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
      );

      for(let genre in Genres){
        this.GenresList.push(genre);
      }

  }
  SelectedAuthor:string="";
  SelectedPublisher:string="";

  
  PublishersList:Publisher[]=[];
  AuthorsList:Author[]=[];
  GenresList:string[]=[];
  
  NewBook:Book={id:undefined,publisherId:undefined,title:"",releaseDate:"",genre:""};
  ChoosedAuthors:Author[]=[];

  BackBtnClick(){
    this.location.back();
  }

  AddBookBtnClick(){
    let good=true;
    if(this.ChoosedAuthors.length==0){
      good=false;
      this.notification.AddMessage("You need to assign authors!");
    }

    if(this.SelectedPublisher==""){
      good=false;
      this.notification.AddMessage("You need to choose publisher!");
    }

    if(this.NewBook.title==""){
      good=false;
      this.notification.AddMessage("You need to add title to book!");
    }

    if(this.NewBook.releaseDate==""){
      good=false;
      this.notification.AddMessage("You need to add release Date!")
    }

    if(this.NewBook.genre==""){
      good=false;
      this.notification.AddMessage("You need to assign genre to book!");
    }

    if(good){// jeżeli dane są dobre
     this.AddBookMain();
    }

  }

  private AddBookMain(){
     this.NewBook.publisherId=Number.parseInt(this.SelectedPublisher);
      this.connection.AddBook(this.NewBook).subscribe(res=>{
        this.NewBook=res;
        this.notification.AddMessage("Book added succesfully");
        
        let promiseObject:Promise<BookAuthor>=null;
        for(let i=0;i<this.AuthorsList.length;i++){
          let BookAuthorNew:BookAuthor={authorId:this.AuthorsList[i].id,bookId:this.NewBook.id,id:undefined};

          if(promiseObject==null)
          promiseObject = this.connection.AddBookAuthorObject(BookAuthorNew).toPromise();
          else{
            promiseObject.finally(()=>{
              promiseObject=this.connection.AddBookAuthorObject(BookAuthorNew).toPromise();
            });

          }    
        }

        this.router.navigate([''])
      });
  }

  AddAuthorClick(){
    
    if(this.SelectedAuthor!=""){
      let tmpAuthor:Author;
      this.AuthorsList.forEach((ob)=>{
        if(ob.id==Number.parseInt(this.SelectedAuthor)){
          tmpAuthor=ob;
        }
          
      })
      let found=false;
      for(let i=0;i<this.ChoosedAuthors.length;i++){
        if(this.ChoosedAuthors[i]==tmpAuthor){
          found=true;
          break;
        }
      }

      if(!found)
        this.ChoosedAuthors.push(tmpAuthor);
    }
    
  }

  RemoveAuthorClick(Id:number){    
   for(let i=0;i<this.ChoosedAuthors.length;i++){
    if(this.ChoosedAuthors[i].id==Id){
        this.ChoosedAuthors.splice(i,1);
        break;
    }
   }
  }
}
