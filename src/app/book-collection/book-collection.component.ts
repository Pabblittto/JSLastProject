import { Book, Genres } from './../Models/Book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css']
})
export class BookCollectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  OriginalBookCollection:Book[]=[{id:1,genre:Genres.adventure,releaseYear:1233,title:"na sztywno ostro",publisherId:12}
                        ,{id:2,genre:Genres.adventure,releaseYear:1998,title:"na sztywno",publisherId:12}
  ];

  DisplayBookCollection:Book[]=[...this.OriginalBookCollection];
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




}
