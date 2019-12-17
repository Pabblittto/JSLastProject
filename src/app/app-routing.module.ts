import { BookDetailsComponent } from './books/book-details/book-details.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { BookCollectionComponent } from './books/book-collection/book-collection.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    component:MainPageComponent
  },
  {
    path:'books',
    loadChildren:'./books/books.module#BooksModule'
  },
  {
    path:'authors',
    loadChildren:'./authors/authors.module#AuthorsModule'
  },
  {
    path:'publishers',
    loadChildren:'./publishers/publishers.module#PublishersModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
