import { TestBed } from '@angular/core/testing';

import { PollOptionService } from './poll-option.service';

describe('PollOptionService', () => {
  let service: PollOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
