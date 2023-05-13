import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubindicatorConfirmComponent } from './add-subindicator-confirm.component';

describe('AddSubindicatorConfirmComponent', () => {
  let component: AddSubindicatorConfirmComponent;
  let fixture: ComponentFixture<AddSubindicatorConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubindicatorConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubindicatorConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
