import { Publisher } from './../../Models/Publisher';
import { NotificationService } from './../../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConnectionService } from './../../services/connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher-edit',
  templateUrl: './publisher-edit.component.html',
  styleUrls: ['./publisher-edit.component.css']
})
export class PublisherEditComponent implements OnInit {

  constructor(
    private notifications:NotificationService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private location:Location,
    private connection:ConnectionService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params=>{
        this.PublisherId=Number.parseInt(params.get('id'));
        if(Number.isNaN(this.PublisherId)){
          this.WrongId=true;
          this.notifications.AddMessage("Entered Id in URL is not a number!")
        }
        else{
          this.WrongId=false;

          this.connection.GetCertainPublisher(this.PublisherId).subscribe(
            res=>{
              this.ThisPublisher=res;
              this.OriginalPublisher={id:undefined,name:res.name,city:res.city,phoneNumber:res.phoneNumber};
            },
            err=>{
              console.log(err);
              this.notifications.AddMessage("Can not download Publisher from server, check log for more details");
              this.WrongId=true;
            }
          )

        }
      }
    )
  }

  ThisPublisher:Publisher={city:"None",id:undefined,name:"None",phoneNumber:0};
  OriginalPublisher:Publisher={city:"None",id:undefined,name:"None",phoneNumber:0};
  
  PublisherId:number;

  ShowQuestion:boolean=false;
  WrongId:boolean=false;
  DisableUpdateBtn:boolean=false;

  BackBtnClick(){
    this.location.back();
  }

  UpdatePublisherBtnClick(){
    if(this.ThisPublisher.name==this.OriginalPublisher.name && 
      this.ThisPublisher.city== this.OriginalPublisher.city &&
      this.ThisPublisher.phoneNumber == this.OriginalPublisher.phoneNumber
      ){
      this.notifications.AddMessage("Publisher doesn't change");
    }
    else{
      this.ShowQuestion=true;
      this.DisableUpdateBtn=false;
    }
  }

  FinalUpdateAuthorBtnClick(){
    this.connection.UpdateCertainPublisher(this.ThisPublisher.id,this.ThisPublisher).subscribe(
      res=>{
        this.notifications.AddMessage("Publisher updated succesfully");
        this.router.navigate(['publishers/list'])
      },
      err=>
      {
        console.log(err);
        this.notifications.AddMessage("Can not update publisher, check log for more details");
        this.ShowQuestion=false;
      }
    )
    this.DisableUpdateBtn=true;
  }

  CancelBtnClick(){
    this.ShowQuestion=false;
  }

}
