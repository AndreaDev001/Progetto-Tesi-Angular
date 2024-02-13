import { TestBed } from '@angular/core/testing';

import { PollLikeService } from './poll-like.service';

describe('PollLikeService', () => {
  let service: PollLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
