import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubIndicatorSpecificComponent } from './sub-indicator-specific.component';

describe('SubIndicatorSpecificComponent', () => {
  let component: SubIndicatorSpecificComponent;
  let fixture: ComponentFixture<SubIndicatorSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubIndicatorSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubIndicatorSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
