import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  AddAuthorBtnClick(){
    this.router.navigate(['authors/add']);
  }


}
