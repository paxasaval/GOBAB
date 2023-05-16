import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDocumentComponent } from './render-document.component';

describe('RenderDocumentComponent', () => {
  let component: RenderDocumentComponent;
  let fixture: ComponentFixture<RenderDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
