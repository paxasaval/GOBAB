import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryIndicatorComponent } from './summary-indicator.component';

describe('SummaryIndicatorComponent', () => {
  let component: SummaryIndicatorComponent;
  let fixture: ComponentFixture<SummaryIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
