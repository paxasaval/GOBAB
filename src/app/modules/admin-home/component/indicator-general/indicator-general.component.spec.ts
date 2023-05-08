import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorGeneralComponent } from './indicator-general.component';

describe('IndicatorGeneralComponent', () => {
  let component: IndicatorGeneralComponent;
  let fixture: ComponentFixture<IndicatorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
