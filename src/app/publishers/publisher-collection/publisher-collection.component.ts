import { Router } from '@angular/router';
import { Publisher } from './../../Models/Publisher';
import { NotificationService } from 'src/app/services/notification.service';
import { ConnectionService } from './../../services/connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher-collection',
  templateUrl: './publisher-collection.component.html',
  styleUrls: ['./publisher-collection.component.css']
})
export class PublisherCollectionComponent implements OnInit {

  constructor(
    private connection:ConnectionService,
    private notification:NotificationService,
    private router:Router
  ) { }

  ngOnInit() {
    this.connection.GetPublishersList().subscribe(
      res=>{
        this.OriginalPublisherList=[...res];
        this.DisplayPyblisherList=[...res];
      },
      err=>{
        console.log(err);
        this.notification.AddMessage("Can not download publisher list from server, check log for more details");
      }

    );

  }

  OriginalPublisherList:Publisher[]=[];
  DisplayPyblisherList:Publisher[]=[];

  AddBtnClick(){
    this.router.navigate(['publishers/add']);
  }
}
