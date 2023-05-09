import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAbstractComponent } from './dialog-abstract.component';

describe('DialogAbstractComponent', () => {
  let component: DialogAbstractComponent;
  let fixture: ComponentFixture<DialogAbstractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAbstractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
