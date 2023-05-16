import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEvidenceComponent } from './section-evidence.component';

describe('SectionEvidenceComponent', () => {
  let component: SectionEvidenceComponent;
  let fixture: ComponentFixture<SectionEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionEvidenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
