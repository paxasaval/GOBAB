import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewUserComponent } from './dialog-new-user.component';

describe('DialogNewUserComponent', () => {
  let component: DialogNewUserComponent;
  let fixture: ComponentFixture<DialogNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
