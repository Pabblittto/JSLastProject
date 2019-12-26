import { BookAuthor } from './../../Models/BookAuthor';
import { ConnectionService } from './../../services/connection.service';
import { Author } from './../../Models/Author';
import { Location } from '@angular/common';
import { NotificationService } from './../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private notifications:NotificationService,
    private location:Location,
    private connection:ConnectionService
    
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params=>{
        this.AuthorId=Number.parseInt(params.get('id'));
        if(Number.isNaN(this.AuthorId)){
          this.WrongId=true;
          this.notifications.AddMessage("Entered Id in URL is not a number!!");
        }
        else{
          this.DownloadAuthor();
        }
      }
    )
  }

  AuthorId:number=0;
  WrongId:boolean=false;
  CertainAuthor:Author={id:undefined,name:"",surname:""};
  BookTitle:string[]=[];

  DownloadAuthor(){
    this.connection.GetCertainAuthor(this.AuthorId).subscribe(
      res=>{
          this.CertainAuthor=res;
          let tmpBooksId:Number[]=[];

          let tmpObjectList:BookAuthor[]=[];
          this.connection.GetObjectsForCertainAuthor(this.CertainAuthor.id).subscribe(
            res=>{
              tmpObjectList=[...res];
              if(res.length==0){
                this.BookTitle.push("No Books");
                return;
              }
              
              for(let i=0;i<tmpObjectList.length;i++){
                this.connection.GetCertainBook(tmpObjectList[i].bookId).subscribe(
                  res=>{
                    this.BookTitle.push(res.title);
                  }
                );
              }
            },
            err=>{
              this.BookTitle.push("No Books");
            }
          )
      },
      err=>{
        console.log(err);
        this.notifications.AddMessage("Can not download author from server, check log for more details");
        this.CertainAuthor={id:undefined,name:"NOT FOUND",surname:"NOT FOUND"};
        this.WrongId=true;
      }
      
    )

  }

  BackBtnClick(){
    this.location.back();
  }

  EditBtnClick(){
    this.router.navigate([`authors/edit/${this.AuthorId}`]);
  }

}
