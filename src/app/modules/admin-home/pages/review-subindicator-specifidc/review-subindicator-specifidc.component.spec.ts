import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSubindicatorSpecifidcComponent } from './review-subindicator-specifidc.component';

describe('ReviewSubindicatorSpecifidcComponent', () => {
  let component: ReviewSubindicatorSpecifidcComponent;
  let fixture: ComponentFixture<ReviewSubindicatorSpecifidcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSubindicatorSpecifidcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubindicatorSpecifidcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
