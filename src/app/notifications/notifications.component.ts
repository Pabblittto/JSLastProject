import { NotificationService } from './../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private notifications:NotificationService) { }

  ngOnInit() {
    this.notifications.SubscribeMessageStream().subscribe(res=>{
        this.messageList.push(res);
        setTimeout(()=>{
          this.messageList.shift();
        },3000);
    })
  }
  messageList:string[]=[];


}
