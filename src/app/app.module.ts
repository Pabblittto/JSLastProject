import { ConnectionService } from './services/connection.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookListElementComponent } from './book-list-element/book-list-element.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BookCollectionComponent,
    AuthorListComponent,
    BookListElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
