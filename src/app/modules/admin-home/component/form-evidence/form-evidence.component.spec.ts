import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEvidenceComponent } from './form-evidence.component';

describe('FormEvidenceComponent', () => {
  let component: FormEvidenceComponent;
  let fixture: ComponentFixture<FormEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEvidenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
