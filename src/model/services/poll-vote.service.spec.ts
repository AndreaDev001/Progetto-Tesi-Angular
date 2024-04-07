import { TestBed } from '@angular/core/testing';

import { PollVoteService } from './poll-vote.service';

describe('PollVoteService', () => {
  let service: PollVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
