import { PublisherRoutes } from './publishers.routers';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublisherCollectionComponent } from './publisher-collection/publisher-collection.component';



@NgModule({
  declarations: [PublisherCollectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PublisherRoutes)
  ]
})
export class PublishersModule { }
