import { Book } from './../../Models/Book';
import { NotificationService } from 'src/app/services/notification.service';
import { ConnectionService } from './../../services/connection.service';
import { Router } from '@angular/router';
import { Publisher } from './../../Models/Publisher';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-publisher-list-element',
  templateUrl: './publisher-list-element.component.html',
  styleUrls: ['./publisher-list-element.component.css']
})
export class PublisherListElementComponent implements OnInit {

  constructor(
    private router:Router,
    private connection:ConnectionService,
    private notifications:NotificationService
    ) { }

  ngOnInit() {
  }

  @Input() ThisPublisher:Publisher;

  ShowQuestion:boolean=false;
  ShowLoadingText:boolean=false;

  EditBtnClick(){
    this.router.navigate([`publishers/details/${this.ThisPublisher.id}`]);
  }

  DeleteBtnClick(){
    this.ShowQuestion=true
  }


  FinalDeleteBtnClick(){
    this.ShowLoadingText=true;
    this.connection.DeleteCertainPublisher(this.ThisPublisher.id).subscribe(
      res=>{
       
        this.notifications.AddMessage("Publisher deleted succesfully");
        this.ClearPublishersInBooks();
        this.ShowLoadingText=false;
        this.ShowQuestion=false;
    },
      err=>{
        this.ShowLoadingText=false;
        this.ShowQuestion=false;
        this.notifications.AddMessage("Can not delete this publisher, check log for more details");
    });


  }

  CancelBtnClick(){
    this.ShowQuestion=false;
  }

  ClearPublishersInBooks(){
    let TmpBooksWithPublisher:Book[]=[];
    this.connection.GetPublishersBooks(this.ThisPublisher.id).subscribe(
      res=>{
        TmpBooksWithPublisher=[...res];

        for(let i=0;i<TmpBooksWithPublisher.length;i++){
          TmpBooksWithPublisher[i].publisherId=0;
          this.connection.UpdateCertainBook(TmpBooksWithPublisher[i].id,TmpBooksWithPublisher[i]).subscribe(
            res=>{
              
            }
          )
        };
        window.location.reload();
      },
      err=>{

      }
    );
  }

}
