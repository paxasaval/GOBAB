import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubindicatorComponent } from './add-subindicator.component';

describe('AddSubindicatorComponent', () => {
  let component: AddSubindicatorComponent;
  let fixture: ComponentFixture<AddSubindicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubindicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubindicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
