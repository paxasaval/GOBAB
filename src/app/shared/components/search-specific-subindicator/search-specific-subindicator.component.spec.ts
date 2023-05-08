import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpecificSubindicatorComponent } from './search-specific-subindicator.component';

describe('SearchSpecificSubindicatorComponent', () => {
  let component: SearchSpecificSubindicatorComponent;
  let fixture: ComponentFixture<SearchSpecificSubindicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSpecificSubindicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSpecificSubindicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
