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
        if(this.OriginalPublisherList.length!=0)
          this.NoPublishers=false;
      },
      err=>{
        console.log(err);
        this.notification.AddMessage("Can not download publisher list from server, check log for more details");
        this.NoPublishers=true;
      }

    );

  }

  OriginalPublisherList:Publisher[]=[];
  DisplayPyblisherList:Publisher[]=[];
  SearchInput:string="";
  
  NoPublishers:boolean=true;

  AddBtnClick(){
    this.router.navigate(['publishers/add']);
  }

  ClearInputBtnClick(){
    this.SearchInput="";
    this.DisplayPyblisherList=[...this.OriginalPublisherList];
    if(this.OriginalPublisherList.length!=0)
      this.NoPublishers=false;
  }
  
  SearchBtnClick(){
    if(this.SearchInput!=""){
            this.DisplayPyblisherList=this.OriginalPublisherList.filter((element)=>{
          return element.name.toLowerCase().includes(this.SearchInput.toLowerCase());
        })

        if(this.DisplayPyblisherList.length==0)
          this.NoPublishers=true;
        else
          this.NoPublishers=false;
    }
    else{
      this.DisplayPyblisherList=[...this.OriginalPublisherList];
      this.NoPublishers=false;
    }
  }
}
