import { DictionaryBookAuthor } from './../../Models/DictionaryBookAuthor';
import { NotificationService } from './../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConnectionService } from '../../services/connection.service';
import { Book } from '../../Models/Book';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

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
        if(this.OriginalBookCollection.length!=0)
          {
             this.NoBooks=false;
            
            for(let i=0;i<this.OriginalBookCollection.length;i++){// pobieranie obiektow 
              this.OriginalDictionaryBookAuthor.push({Bookid:this.OriginalBookCollection[i].id,Authors:[],Book:this.OriginalBookCollection[i]});
              this.connection.GetObjectForCertainBook(this.OriginalBookCollection[i].id).subscribe(
                res=>{// tu mamy liste obiektow z lista id aktorow
                  for(let j=0;j<res.length;j++){
                    this.connection.GetCertainAuthor(res[j].authorId).subscribe(
                      author=>{
                        this.OriginalDictionaryBookAuthor[i].Authors.push(author);
                      }
                    )
                  }  
                  this.DisplayingDictionaryBookAuthor=[...this.OriginalDictionaryBookAuthor];       
                }
              )
            }
            this.DisplayingDictionaryBookAuthor=[...this.OriginalDictionaryBookAuthor];       
                 console.log(this.DisplayingDictionaryBookAuthor);
                 
          }
      },
      (err:HttpErrorResponse)=>{
        this.notification.AddMessage("Can not download list from server, check log for more information");
        console.log(err);
        this.NoBooks=true;
      }
    );
  } 

  OriginalBookCollection:Book[];

  // lista która jest wyświetlana, jeżeli są nakładane filtry to 
  //original jest skracanei tu wkładane

  OriginalDictionaryBookAuthor:DictionaryBookAuthor[]=[];
  DisplayingDictionaryBookAuthor:DictionaryBookAuthor[]=[];

  NoBooks:boolean=true;
  HiddenSortPanel:boolean=true;
  HiddenSearchPanel:boolean=true;

  SearchInput:string="";
  SelectedSearchPool:string="0";

  SelectedSortPool:string="0";
  SelectedSortingWayPool:string="0";

  SortShowBtnClick(){// przycisk pokazujący sortowanie
    this.HiddenSortPanel = !this.HiddenSortPanel;
  }

  SearchShowBtnClick(){// przycisk pokazujący szukanie
    this.HiddenSearchPanel = !this.HiddenSearchPanel;
  }


  SearchBtnClick(){
    this.DisplayingDictionaryBookAuthor=[...this.OriginalDictionaryBookAuthor];// resetujemy zawartość wyswietlana
    switch (this.SelectedSearchPool) {
      case "1":// title
        this.DisplayingDictionaryBookAuthor= this.DisplayingDictionaryBookAuthor.filter((element=>{
          return element.Book.title.toLowerCase().includes(this.SearchInput.toLowerCase());
        }))

        if(this.DisplayingDictionaryBookAuthor.length==0)// show that there is no books to display
          this.NoBooks=true;
        break;
      case "2":// genre
        this.DisplayingDictionaryBookAuthor= this.DisplayingDictionaryBookAuthor.filter((element=>{
          return element.Book.genre.toLowerCase().includes(this.SearchInput.toLowerCase());
        }))

        if(this.DisplayingDictionaryBookAuthor.length==0)// show that there is no books to display
        this.NoBooks=true;
        break;
      case "3":// authors name
        this.DisplayingDictionaryBookAuthor= this.DisplayingDictionaryBookAuthor.filter((element=>{
          for(let i=0;i<element.Authors.length;i++){
            if(element.Authors[i].name.toLowerCase().includes(this.SearchInput.toLowerCase()))
              return true;
          }
          return false;
        }))

        if(this.DisplayingDictionaryBookAuthor.length==0)// show that there is no books to display
        this.NoBooks=true;
        break;
      case "4":// authors surname
        this.DisplayingDictionaryBookAuthor= this.DisplayingDictionaryBookAuthor.filter((element=>{
          for(let i=0;i<element.Authors.length;i++){
            if(element.Authors[i].surname.toLowerCase().includes(this.SearchInput.toLowerCase()))
              return true;
          }
          return false;
        }))

        if(this.DisplayingDictionaryBookAuthor.length==0)// show that there is no books to display
        this.NoBooks=true;
        break;

    }
    
  }
  SearchClearBtnClick(){
    this.SearchInput="";
    this.SelectedSearchPool="0";
    this.DisplayingDictionaryBookAuthor=[...this.OriginalDictionaryBookAuthor];// resetujemy zawartość wyswietlana
    this.NoBooks=false;

  }

  SortClearBtnClick(){

  }

  SortBtnClick(){
    console.log("Sortingg");
  }

  AddBtnClick(){
    this.router.navigate(['books/addbook']);
  }



}
