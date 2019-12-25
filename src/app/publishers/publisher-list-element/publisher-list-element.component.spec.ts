import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherListElementComponent } from './publisher-list-element.component';

describe('PublisherListElementComponent', () => {
  let component: PublisherListElementComponent;
  let fixture: ComponentFixture<PublisherListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
