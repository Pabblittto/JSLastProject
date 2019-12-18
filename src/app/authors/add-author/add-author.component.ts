import { Router } from '@angular/router';
import { ConnectionService } from './../../services/connection.service';
import { NotificationService } from './../../services/notification.service';
import { Author } from './../../Models/Author';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  constructor(
    private location:Location, 
    private notifications:NotificationService,
    private connection:ConnectionService ,
    private router:Router) { }

  ngOnInit() {
  }

  NewAuthor:Author={name:"",surname:"",id:undefined};
  
  BackBtnClick(){
    this.location.back();
  }


  AddAuthorBtnClick(){
    let good=true;
    if(this.NewAuthor.name==""){
      good=false;
      this.notifications.AddMessage("Author's name can not be empty !");
    }

    if(this.NewAuthor.surname==""){
      this.notifications.AddMessage("Author's surname can not be empty!");
      good=false;
    }

    if(good){
      this.connection.AddAuthor(this.NewAuthor).subscribe(
        res=>{
          this.notifications.AddMessage("Author added succesfully");
          this.router.navigate(['authors/list']);
        },
        err=>{
          this.notifications.AddMessage("Something went wrong, check log ");
          console.log(err);
        }
      )
      
    }


  }
}
