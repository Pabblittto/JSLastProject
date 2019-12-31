import { AuthorEditComponent } from './../../authors/author-edit/author-edit.component';
import { Publisher } from './../../Models/Publisher';
import { Author } from './../../Models/Author';
import { BookAuthor } from './../../Models/BookAuthor';
import { Book, Genres } from './../../Models/Book';
import { Location } from '@angular/common';
import { ConnectionService } from './../../services/connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  constructor(
    private notifications:NotificationService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private location:Location,
    private connection:ConnectionService
  ) { }

  ngOnInit() {
    for(let genre in Genres){
      this.GenresList.push(genre);
    }

    this.connection.GetAuthorList().subscribe(res=>{this.AuthorsList=[...res]}
      ,err=>{
        console.log(err);
        this.notifications.AddMessage("Can not download authors form server, check log for more details");}
      );

    this.connection.GetPublishersList().subscribe(res=>{this.PublishersList=[...res]},
      err=>{
        console.log(err);
        this.notifications.AddMessage("Can not download publishers from server, check log for more details");
      }
      )

    this.activatedRoute.paramMap.subscribe(
      params=>{
        this.BookId=Number.parseInt(params.get('id'));
        if(Number.isNaN(this.BookId)){
          this.WrongId=true;
          this.notifications.AddMessage("Entered Id in URL is not a number!");
          this.ThisBook={genre:"None",id:undefined,publisherId:undefined,releaseDate:"None",title:"None",pages:0};

        }
        else{// if book id is correct
          this.connection.GetCertainBook(this.BookId).subscribe(
            res=>{
              this.ThisBook=res;
              this.OriginalBook={id:undefined,genre:res.genre,publisherId:res.publisherId,releaseDate:res.releaseDate,title:res.title,pages:res.pages};

              this.connection.GetObjectForCertainBook(this.BookId).subscribe(
                res=>{
                  this.BookAuthorsObjectList=[...res];

                  for(let i=0;i<this.BookAuthorsObjectList.length;i++){
                    this.connection.GetCertainAuthor(this.BookAuthorsObjectList[i].authorId).subscribe(res=>{
                      this.BookAuthorsList.push(res);
                      this.OriginalAuthorsList.push(res);
                    });
                  }
                }
              )

            },
            err=>{
              console.log(err);
              this.notifications.AddMessage("Can not download Book from server, check log for more details");
              this.ThisBook={genre:"None",id:undefined,publisherId:undefined,releaseDate:"None",title:"None",pages:0};

              this.WrongId=true;
            }
          )

        }
      }
    )
  }

  BookId:number;
  OriginalBook:Book={genre:"",id:undefined,publisherId:undefined,releaseDate:"",title:"",pages:0};
  OriginalAuthorsList:Author[]=[];

  ThisBook:Book={genre:"",id:undefined,publisherId:undefined,releaseDate:"",title:"",pages:0};
  BookAuthorsList:Author[]=[];

  BookAuthorsObjectList:BookAuthor[]=[];

  // all objects form server
  PublishersList:Publisher[]=[];
  AuthorsList:Author[]=[];
  GenresList:string[]=[];

  WrongId:boolean=false;
  ShowQuestion:boolean=false;
  DisableUpdateBtn:boolean=false;
  AuthorsModyfied:boolean=false;

  RemoveAuthorClick(Id:number){
    this.AuthorsModyfied=true;
    for(let i=0;i<this.BookAuthorsList.length;i++){
      if(this.BookAuthorsList[i].id==Id){
          this.BookAuthorsList.splice(i,1);
          break;
      }
     }
  }


  //Author managment
  SelectedAuthor:string="";

  BackBtnClick(){
    this.location.back();
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
      for(let i=0;i<this.BookAuthorsList.length;i++){
        if(this.BookAuthorsList[i].id==tmpAuthor.id){
          found=true;
          break;
        }
      }
      if(!found)
      this.AuthorsModyfied=true;
        this.BookAuthorsList.push(tmpAuthor);
    }
  }

  UpdateBookBtnClick(){
    if(this.OriginalBook.genre == this.ThisBook.genre && 
      this.OriginalBook.publisherId == this.ThisBook.publisherId && 
      this.OriginalBook.releaseDate == this.ThisBook.releaseDate && 
      this.OriginalBook.title == this.ThisBook.title && 
      this.AuthorsModyfied==false
      ){
        this.notifications.AddMessage("Nothing changed");
      }
      else{
        this.ShowQuestion=true;
      }

  }


  CancelBtnClick(){
    this.ShowQuestion=false;
  }

  FinalUpdateBookBtnClick(){
    this.DisableUpdateBtn=true;

    this.connection.UpdateCertainBook(this.ThisBook.id,this.ThisBook).subscribe(
      res=>{
        for(let author of this.BookAuthorsList){// for each author in updating book
          let exists=false;
          for(let existed of this.OriginalAuthorsList){// if certain author exists inoriginal list - it means we dont have to add it again
              if(existed.id==author.id){
                exists=true;
                break;
              }
          };
          if(!exists){
            this.connection.AddBookAuthorObject({authorId:author.id,bookId:this.ThisBook.id,id:undefined}).subscribe();
          }
        };
        

        for(let OriginalAuthor of this.OriginalAuthorsList){
          let exists=false;
          for(let newAuthor of this.BookAuthorsList){
            if(newAuthor.id==OriginalAuthor.id){
              exists=true;
              break;
            }
          }

          if(!exists)// if author does not exist, this mean that we need delete connection between this book and this author
          {
            for(let bookAuthorObject of this.BookAuthorsObjectList){
              if(bookAuthorObject.authorId==OriginalAuthor.id){
                this.connection.DeleteBookAuthorObject(bookAuthorObject.id).subscribe();
                break;
              }
            }
            
          } 
        }
        setTimeout(()=>{
          this.router.navigate(['books/list'])
        },800);
      },
      err=>{
        this.notifications.AddMessage("Can not update Book, check log for more details")
        console.log(err);
        this.ShowQuestion=false;
        this.DisableUpdateBtn=false;
      }
    )


  }


}
