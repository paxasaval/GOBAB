import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarEvidencesComponent } from './side-bar-evidences.component';

describe('SideBarEvidencesComponent', () => {
  let component: SideBarEvidencesComponent;
  let fixture: ComponentFixture<SideBarEvidencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarEvidencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarEvidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
