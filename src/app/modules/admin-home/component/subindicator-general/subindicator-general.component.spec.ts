import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubindicatorGeneralComponent } from './subindicator-general.component';

describe('SubindicatorGeneralComponent', () => {
  let component: SubindicatorGeneralComponent;
  let fixture: ComponentFixture<SubindicatorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubindicatorGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubindicatorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
