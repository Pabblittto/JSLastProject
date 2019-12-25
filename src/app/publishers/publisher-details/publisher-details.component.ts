import { Location } from '@angular/common';
import { Book } from './../../Models/Book';
import { Publisher } from './../../Models/Publisher';

import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from './../../services/connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {

  constructor(
    private connection:ConnectionService,
    private activatedRoute:ActivatedRoute,
    private notification:NotificationService,
    private location:Location
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params=>{
        this.publisherId= parseInt(params.get('id'));
        if(Number.isNaN(this.publisherId)){
          this.WrongId=true;
          this.notification.AddMessage("Entered Id in URL is not a number");
        }else{
          this.DownloadPublisher();
        }
      }
    )
  }

  WrongId:boolean=false;
  publisherId:number;
  CertainPublisher:Publisher={city:"",id:undefined,name:"",phoneNumber:1};

  BooksList:Book[]=[];

  DownloadPublisher(){
    this.connection.GetCertainPublisher(this.publisherId).subscribe(
      res=>{
        this.CertainPublisher=res;
    },
      err=>{
        console.log(err);
        this.notification.AddMessage("Can not download publisher from server, check log for more information");
    });

    this.connection.GetPublishersBooks(this.publisherId).subscribe(
      res=>{
        this.BooksList=[...res];
      },
      err=>{
        this.notification.AddMessage("Can not download books from server, check log for more information");
        console.log(err);
        
      }
    )

    
  }

  BackBtnClick(){
    this.location.back();
  }

  EditBtnClick(){
    
  }
}
