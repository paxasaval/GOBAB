import { TestBed } from '@angular/core/testing';

import { SubindicatorService } from './subindicator.service';

describe('SubindicatorService', () => {
  let service: SubindicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubindicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
