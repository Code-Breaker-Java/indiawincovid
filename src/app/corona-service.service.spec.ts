import { TestBed } from '@angular/core/testing';

import { CoronaServiceService } from './corona-service.service';

describe('CoronaServiceService', () => {
  let service: CoronaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
