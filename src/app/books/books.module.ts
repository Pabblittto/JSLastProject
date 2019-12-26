import { FormsModule } from '@angular/forms';
import { BooksRoutes } from './books.routes';
import { RouterModule } from '@angular/router';
import { BookListElementComponent } from './book-list-element/book-list-element.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { AuthorsSmallRectangleComponent } from './authors-small-rectangle/authors-small-rectangle.component';
import { AddBookComponent } from './add-book/add-book.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookEditComponent } from './book-edit/book-edit.component';



@NgModule({
  declarations: [
    AddBookComponent,
    AuthorsSmallRectangleComponent,
    BookCollectionComponent,
    BookDetailsComponent,
    BookListElementComponent,
    BookEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(BooksRoutes)
  ]
})
export class BooksModule { }
