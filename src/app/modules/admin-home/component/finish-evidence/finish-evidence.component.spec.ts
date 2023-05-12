import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishEvidenceComponent } from './finish-evidence.component';

describe('FinishEvidenceComponent', () => {
  let component: FinishEvidenceComponent;
  let fixture: ComponentFixture<FinishEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishEvidenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
