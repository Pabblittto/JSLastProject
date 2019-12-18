import { NotificationService } from './../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';
import { Book, Genres } from '../../Models/Book';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css']
})
export class BookCollectionComponent implements OnInit {

  constructor(
    private connection:ConnectionService, 
    private router:Router,
    private notification:NotificationService
    ) { }

  ngOnInit() {
    this.connection.GetBookList().subscribe(
      res=>{
        this.OriginalBookCollection=[...res];
        this.DisplayBookCollection=[...res];
      },
      (err:HttpErrorResponse)=>{
        this.notification.AddMessage("Can not download list from server, check log for more information");
        console.log(err);
        
      }
    );
  } 

  OriginalBookCollection:Book[];

  DisplayBookCollection:Book[]=[];
  // lista która jest wyświetlana, jeżeli są nakładane filtry to 
  //original jest skracanei tu wkładane

  HiddenSortPanel:boolean=true;
  HiddenSearchPanel:boolean=true;

  SortShowBtnClick(){// przycisk pokazujący sortowanie
    this.HiddenSortPanel = !this.HiddenSortPanel;
  }

  SearchShowBtnClick(){// przycisk pokazujący szukanie
    this.HiddenSearchPanel = !this.HiddenSearchPanel;
  }

  AddBtnClick(){
    this.router.navigate(['books/addbook']);
  }



}
