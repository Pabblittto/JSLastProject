import { FormsModule } from '@angular/forms';
import { AuthorsRoutes } from './authors.routes';
import { RouterModule } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AuthorListElementComponent } from './author-list-element/author-list-element.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';



@NgModule({
  declarations: [    
    AuthorListComponent, AddAuthorComponent, AuthorListElementComponent, AuthorDetailsComponent, AuthorEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AuthorsRoutes)
  ]
})
export class AuthorsModule { }
