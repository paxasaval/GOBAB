import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadrantSectionComponent } from './quadrant-section.component';

describe('QuadrantSectionComponent', () => {
  let component: QuadrantSectionComponent;
  let fixture: ComponentFixture<QuadrantSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadrantSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadrantSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
