import { BooksRoutes } from './books.routes';
import { RouterModule } from '@angular/router';
import { BookListElementComponent } from './book-list-element/book-list-element.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { AuthorsSmallRectangleComponent } from './authors-small-rectangle/authors-small-rectangle.component';
import { AddBookComponent } from './add-book/add-book.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AddBookComponent,
    AuthorsSmallRectangleComponent,
    BookCollectionComponent,
    BookDetailsComponent,
    BookListElementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(BooksRoutes)
  ]
})
export class BooksModule { }
