import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WkconfigComponent } from './wkconfig.component';

describe('WkconfigComponent', () => {
  let component: WkconfigComponent;
  let fixture: ComponentFixture<WkconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WkconfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WkconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
