import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsSubindicatorComponent } from './steps-subindicator.component';

describe('StepsSubindicatorComponent', () => {
  let component: StepsSubindicatorComponent;
  let fixture: ComponentFixture<StepsSubindicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsSubindicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsSubindicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
