import { BookEditComponent } from './book-edit/book-edit.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { Routes } from '@angular/router';


export const BooksRoutes: Routes=[
    {
        path:'list',
        component:BookCollectionComponent
    },
    {
        path:'',
        redirectTo:'list'
    },
    {
        path:'details/:id',
        component:BookDetailsComponent
    },
    {
        path:'addbook',
        component:AddBookComponent
    },
    {
        path:'edit/:id',
        component:BookEditComponent
    }


];