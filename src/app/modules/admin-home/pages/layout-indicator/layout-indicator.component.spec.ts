import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutIndicatorComponent } from './layout-indicator.component';

describe('LayoutIndicatorComponent', () => {
  let component: LayoutIndicatorComponent;
  let fixture: ComponentFixture<LayoutIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
