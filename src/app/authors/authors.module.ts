import { AuthorsRoutes } from './authors.routes';
import { RouterModule } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [    
    AuthorListComponent],
  imports: [
    CommonModule,

    RouterModule.forChild(AuthorsRoutes)
  ]
})
export class AuthorsModule { }
