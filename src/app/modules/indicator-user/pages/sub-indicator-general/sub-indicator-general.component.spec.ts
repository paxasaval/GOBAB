import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubIndicatorGeneralComponent } from './sub-indicator-general.component';

describe('SubIndicatorGeneralComponent', () => {
  let component: SubIndicatorGeneralComponent;
  let fixture: ComponentFixture<SubIndicatorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubIndicatorGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubIndicatorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
