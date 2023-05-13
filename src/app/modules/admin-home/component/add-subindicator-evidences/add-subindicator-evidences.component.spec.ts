import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubindicatorEvidencesComponent } from './add-subindicator-evidences.component';

describe('AddSubindicatorEvidencesComponent', () => {
  let component: AddSubindicatorEvidencesComponent;
  let fixture: ComponentFixture<AddSubindicatorEvidencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubindicatorEvidencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubindicatorEvidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
