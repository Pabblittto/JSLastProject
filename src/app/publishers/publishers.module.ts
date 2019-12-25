import { FormsModule } from '@angular/forms';
import { PublisherRoutes } from './publishers.routers';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublisherCollectionComponent } from './publisher-collection/publisher-collection.component';
import { PublisherListElementComponent } from './publisher-list-element/publisher-list-element.component';
import { PublisherDetailsComponent } from './publisher-details/publisher-details.component';
import { AddPublisherComponent } from './add-publisher/add-publisher.component';



@NgModule({
  declarations: [PublisherCollectionComponent, PublisherListElementComponent, PublisherDetailsComponent, AddPublisherComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PublisherRoutes)
  ]
})
export class PublishersModule { }
