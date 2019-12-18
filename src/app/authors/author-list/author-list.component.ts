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
      },
      err=>{
        this.notification.AddMessage("Can not download list from server, check log for details");
        console.log(err);
      }
    )
  }

  OriginalAuthorsCollection:Author[]=[];
  DisplayAuthorsCollection:Author[]=[];


  AddAuthorBtnClick(){
    this.router.navigate(['authors/add']);
  }


}
