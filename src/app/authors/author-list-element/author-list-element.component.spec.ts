import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorListElementComponent } from './author-list-element.component';

describe('AuthorListElementComponent', () => {
  let component: AuthorListElementComponent;
  let fixture: ComponentFixture<AuthorListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
