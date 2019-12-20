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
    }

]