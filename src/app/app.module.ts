import { ConnectionService } from './services/connection.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListElementComponent } from './book-list-element/book-list-element.component';
import { AuthorsSmallRectangleComponent } from './authors-small-rectangle/authors-small-rectangle.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HttpClientModule } from '@angular/common/http';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BookCollectionComponent,
    AuthorListComponent,
    BookListElementComponent,
    AuthorsSmallRectangleComponent,
    BookDetailsComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
