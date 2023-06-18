import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSubindicatorsTableComponent } from './specific-subindicators.component';

describe('SpecificSubindicatorsComponent', () => {
  let component: SpecificSubindicatorsTableComponent;
  let fixture: ComponentFixture<SpecificSubindicatorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificSubindicatorsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificSubindicatorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
