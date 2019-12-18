import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private MessageStream= new Subject<string>();

  SubscribeMessageStream():Subject<string>{
    return this.MessageStream;
  }

  AddMessage(message:string){
    this.MessageStream.next(message);
  }
}

