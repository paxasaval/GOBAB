import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarIndicatorsComponent } from './navbar-indicators.component';

describe('NavbarIndicatorsComponent', () => {
  let component: NavbarIndicatorsComponent;
  let fixture: ComponentFixture<NavbarIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarIndicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
