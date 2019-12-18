import { FormsModule } from '@angular/forms';
import { AuthorsRoutes } from './authors.routes';
import { RouterModule } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AuthorListElementComponent } from './author-list-element/author-list-element.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';



@NgModule({
  declarations: [    
    AuthorListComponent, AddAuthorComponent, AuthorListElementComponent, AuthorDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AuthorsRoutes)
  ]
})
export class AuthorsModule { }
