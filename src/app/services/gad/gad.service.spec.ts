import { TestBed } from '@angular/core/testing';

import { GadService } from './gad.service';

describe('GadService', () => {
  let service: GadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
