import { TestBed } from '@angular/core/testing';

import { DiscussionLikeService } from './discussion-like.service';

describe('DiscussionLikeService', () => {
  let service: DiscussionLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscussionLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
