import { AuthorListComponent } from './author-list/author-list.component';
import { Routes } from '@angular/router';

export const AuthorsRoutes: Routes=[
    {
        path:'list',
        component:AuthorListComponent
    },
    {
        path:'',
        redirectTo:'list'
    }
]