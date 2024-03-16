import { TestBed } from '@angular/core/testing';

import { DiscussionCommentService } from './discussion-comment.service';

describe('DiscussionCommentService', () => {
  let service: DiscussionCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscussionCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
