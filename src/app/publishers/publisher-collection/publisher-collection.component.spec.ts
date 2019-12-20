import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherCollectionComponent } from './publisher-collection.component';

describe('PublisherCollectionComponent', () => {
  let component: PublisherCollectionComponent;
  let fixture: ComponentFixture<PublisherCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
