import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEvidence1Component } from './input-evidence1.component';

describe('InputEvidence1Component', () => {
  let component: InputEvidence1Component;
  let fixture: ComponentFixture<InputEvidence1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputEvidence1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEvidence1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
