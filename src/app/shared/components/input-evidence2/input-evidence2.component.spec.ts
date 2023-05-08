import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEvidence2Component } from './input-evidence2.component';

describe('InputEvidence2Component', () => {
  let component: InputEvidence2Component;
  let fixture: ComponentFixture<InputEvidence2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputEvidence2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEvidence2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
