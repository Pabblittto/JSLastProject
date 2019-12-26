import { PublisherEditComponent } from './publisher-edit/publisher-edit.component';
import { AddPublisherComponent } from './add-publisher/add-publisher.component';
import { PublisherDetailsComponent } from './publisher-details/publisher-details.component';
import { PublisherCollectionComponent } from './publisher-collection/publisher-collection.component';
import { Routes } from '@angular/router';

export const PublisherRoutes: Routes=[
    {
        path:"list",
        component:PublisherCollectionComponent
    },
    {
        path:"",
        redirectTo:"list"
    },
    {
        path:"details/:id",
        component:PublisherDetailsComponent
    },
    {
        path:"add",
        component:AddPublisherComponent
    },
    {
        path:"edit/:id",
        component:PublisherEditComponent
    }

]