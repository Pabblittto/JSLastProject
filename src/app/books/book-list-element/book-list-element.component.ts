import { DictionaryBookAuthor } from './../../Models/DictionaryBookAuthor';
import { NotificationService } from 'src/app/services/notification.service';
import { ConnectionService } from './../../services/connection.service';
import { Book } from '../../Models/Book';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-list-element',
  templateUrl: './book-list-element.component.html',
  styleUrls: ['./book-list-element.component.css']
})
export class BookListElementComponent implements OnInit {

  constructor(
    private connection:ConnectionService,
    private notifications:NotificationService
  ) { }

  ngOnInit() {
  }

  @Input() ThisBook:DictionaryBookAuthor;

  ShowQuestion:boolean=false;
  ShowLoadingText:boolean=false;

  OpenDetails(){
    window.location.href=`books/details/${this.ThisBook.Bookid}`;
  }

  DeleteBtnClick(){
    this.ShowQuestion=true;
  }

  FinalDeleteBtnClick(){
    this.ShowQuestion=true;
    this.connection.DeleteCertainBook(this.ThisBook.Book.id).subscribe(
      res=>{
        this.notifications.AddMessage("Book deleted succesfully");
        window.location.reload();
      },
      err=>{
        console.log(err);
        this.notifications.AddMessage("Can not delete book from server, check log for more details");
        this.ShowLoadingText=false;
        this.ShowQuestion=false;
      }
    );

  }

  CancelBtnClick(){
    this.ShowQuestion=false;
  }



}
