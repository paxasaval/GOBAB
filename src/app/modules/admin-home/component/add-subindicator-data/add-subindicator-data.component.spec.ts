import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubindicatorDataComponent } from './add-subindicator-data.component';

describe('AddSubindicatorDataComponent', () => {
  let component: AddSubindicatorDataComponent;
  let fixture: ComponentFixture<AddSubindicatorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubindicatorDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubindicatorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
