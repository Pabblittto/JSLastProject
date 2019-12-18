import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AddAuthorComponent } from './add-author/add-author.component';
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
    },
    {
        path:'add',
        component:AddAuthorComponent
    },
    {
        path:'details/:id',
        component:AuthorDetailsComponent
    }
]