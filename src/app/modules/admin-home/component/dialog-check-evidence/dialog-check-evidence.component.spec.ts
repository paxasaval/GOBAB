import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCheckEvidenceComponent } from './dialog-check-evidence.component';

describe('DialogCheckEvidenceComponent', () => {
  let component: DialogCheckEvidenceComponent;
  let fixture: ComponentFixture<DialogCheckEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCheckEvidenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCheckEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
