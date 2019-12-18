import { ConnectionService } from './../../services/connection.service';
import { Author } from './../../Models/Author';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-authors-small-rectangle',
  templateUrl: './authors-small-rectangle.component.html',
  styleUrls: ['./authors-small-rectangle.component.css']
})
export class AuthorsSmallRectangleComponent implements OnInit {

  constructor( private connection:ConnectionService) { }

  ngOnInit() {
  }

@Input() BookId:number;
Authors:Author[]=[]

}
