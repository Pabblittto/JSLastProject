import { Router } from '@angular/router';
import { ConnectionService } from './../../services/connection.service';
import { NotificationService } from './../../services/notification.service';
import { Publisher } from './../../Models/Publisher';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.css']
})
export class AddPublisherComponent implements OnInit {

  constructor(
    private location:Location,
    private notifications:NotificationService,
    private connection:ConnectionService,
    private router:Router

  ) { }

  ngOnInit() {
  }

  NewPublisher:Publisher={city:"",name:"",phoneNumber:undefined,id:undefined};

  BackBtnClick(){
    this.location.back();
  }

  AddPublisher(){
    let good=true;

    if(this.NewPublisher.name==""){
      this.notifications.AddMessage("Name can not be empty!")
      good=false;
    }

    if(this.NewPublisher.city==""){
      this.notifications.AddMessage("City can not be empty!");
      good=false;
    }

    if(this.NewPublisher.phoneNumber==undefined || this.NewPublisher.phoneNumber==0){
      this.notifications.AddMessage("Phone number can not be empty!");
      good=false;
    }


    if(good){
      this.connection.AddPublisher(this.NewPublisher).subscribe(
        res=>{
          this.notifications.AddMessage("Publisher added succesfully");
          this.router.navigate(['publishers/list']);
        },
        err=>{
          this.notifications.AddMessage("Failed to add new Publisher, check log for more details");
        }
      )
    }

  }
}
