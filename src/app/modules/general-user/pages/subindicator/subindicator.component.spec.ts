import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubindicatorComponent } from './subindicator.component';

describe('SubindicatorComponent', () => {
  let component: SubindicatorComponent;
  let fixture: ComponentFixture<SubindicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubindicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubindicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
