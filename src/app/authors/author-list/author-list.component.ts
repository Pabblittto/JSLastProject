import { Author } from './../../Models/Author';
import { NotificationService } from './../../services/notification.service';
import { ConnectionService } from './../../services/connection.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  constructor(
    private router:Router,
    private connection:ConnectionService,
    private notification:NotificationService) { }

  ngOnInit() {
    this.connection.GetAuthorList().subscribe(
      res=>{
        this.OriginalAuthorsCollection=[...res];
        this.DisplayAuthorsCollection=[...res];
        if(this.OriginalAuthorsCollection.length!=0)
          this.NoAuthors=false;
      },
      err=>{
        this.notification.AddMessage("Can not download list from server, check log for details");
        console.log(err);
      }
    )
  }

  OriginalAuthorsCollection:Author[]=[];
  DisplayAuthorsCollection:Author[]=[];

  NoAuthors:boolean=true;

  SelectSearchOption:string="0";
  SearchInput:string="";


  AddAuthorBtnClick(){
    this.router.navigate(['authors/add']);
  }

  SearchClearBtnClick(){
    this.SearchInput="";
    this.SelectSearchOption="0";
    this.DisplayAuthorsCollection=[...this.OriginalAuthorsCollection];
    this.NoAuthors=false;
  }


  SearchBtnClick(){
    this.DisplayAuthorsCollection=[...this.OriginalAuthorsCollection];
    this.NoAuthors=false;
    switch (this.SelectSearchOption) {
      case "1":// name
        this.DisplayAuthorsCollection=this.DisplayAuthorsCollection.filter((element)=>{
          return element.name.toLowerCase().includes(this.SearchInput.toLowerCase());
        });

        if(this.DisplayAuthorsCollection.length==0)
          this.NoAuthors=true;
        break;
      case "2":// surname
        this.DisplayAuthorsCollection=this.DisplayAuthorsCollection.filter((element)=>{
          return element.surname.toLowerCase().includes(this.SearchInput.toLowerCase());
        });
        
        if(this.DisplayAuthorsCollection.length==0)
          this.NoAuthors=true;
        break;
    }
  }

}
