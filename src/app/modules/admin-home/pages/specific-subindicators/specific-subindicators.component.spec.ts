import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSubindicatorsComponent } from './specific-subindicators.component';

describe('SpecificSubindicatorsComponent', () => {
  let component: SpecificSubindicatorsComponent;
  let fixture: ComponentFixture<SpecificSubindicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificSubindicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificSubindicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
