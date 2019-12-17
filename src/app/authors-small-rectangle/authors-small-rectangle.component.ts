import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-authors-small-rectangle',
  templateUrl: './authors-small-rectangle.component.html',
  styleUrls: ['./authors-small-rectangle.component.css']
})
export class AuthorsSmallRectangleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

@Input() BookId:number;

}
