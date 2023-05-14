import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrantSummaryComponent } from './quadrant-summary.component';

describe('QuadrantSummaryComponent', () => {
  let component: QuadrantSummaryComponent;
  let fixture: ComponentFixture<QuadrantSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadrantSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadrantSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
