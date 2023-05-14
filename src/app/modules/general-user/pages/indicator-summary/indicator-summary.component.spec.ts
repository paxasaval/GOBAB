import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorSummaryComponent } from './indicator-summary.component';

describe('IndicatorSummaryComponent', () => {
  let component: IndicatorSummaryComponent;
  let fixture: ComponentFixture<IndicatorSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
