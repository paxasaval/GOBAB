import { TestBed } from '@angular/core/testing';

import { IndicatorInstanceService } from './indicator-instance.service';

describe('IndicatorInstanceService', () => {
  let service: IndicatorInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
