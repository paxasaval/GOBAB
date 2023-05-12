import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsEvidenceComponent } from './steps-evidence.component';

describe('StepsEvidenceComponent', () => {
  let component: StepsEvidenceComponent;
  let fixture: ComponentFixture<StepsEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsEvidenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
