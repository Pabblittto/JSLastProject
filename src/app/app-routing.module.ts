import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:"",
    component:MainPageComponent
  },
  {
    path:'bookcollection',
    component:BookCollectionComponent
  },
  {
    path:'authorlist',
    component:AuthorListComponent
  },
  {
    path:'details/:id',
    component:BookDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
