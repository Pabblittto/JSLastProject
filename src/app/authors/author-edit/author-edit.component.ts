import { Author } from './../../Models/Author';
import { ConnectionService } from './../../services/connection.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

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
        this.AuthorId=Number.parseInt(params.get('id'));
        if(Number.isNaN(this.AuthorId)){
          this.WrongId=true;
          this.notifications.AddMessage("Entered Id in URL is not a number!")
        }
        else{
          this.WrongId=false;

          this.connection.GetCertainAuthor(this.AuthorId).subscribe(
            res=>{
              this.ThisAuthor=res;
              this.OriginalAuthor={id:undefined,name:res.name,surname:res.surname};
            },
            err=>{
              console.log(err);
              this.notifications.AddMessage("Can not download Author from server, check log for more details");
              this.WrongId=true;
            }
          )

        }
      }
    )
  }

  AuthorId:number;
  WrongId:boolean=false;
  ThisAuthor:Author={id:undefined,name:"None",surname:"None"};
  DisableUpdateBtn:boolean=false;

  OriginalAuthor:Author={id:undefined,name:"None",surname:"None"};

  ShowQuestion:boolean=false;


  BackBtnClick(){
    this.location.back();
  }


  UpdateAuthorBtnClick(){
    if(this.ThisAuthor.name==this.OriginalAuthor.name && this.ThisAuthor.surname== this.OriginalAuthor.surname){
      this.notifications.AddMessage("Author doesn't changed");
    }
    else{
      this.ShowQuestion=true;
      this.DisableUpdateBtn=false;
    }
  }


  FinalUpdateAuthorBtnClick(){
    this.connection.UpdateCertainAuthor(this.ThisAuthor.id,this.ThisAuthor).subscribe(
      res=>{
        this.notifications.AddMessage("Author updated succesfully");
        this.router.navigate(['authors/list'])
      },
      err=>
      {
        console.log(err);
        this.notifications.AddMessage("Can not update author, check log for more details");
        this.ShowQuestion=false;
      }
    )
    this.DisableUpdateBtn=true;
  }

  CancelBtnClick(){
    this.ShowQuestion=false;
  }

}
