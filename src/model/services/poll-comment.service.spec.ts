import { TestBed } from '@angular/core/testing';

import { PollCommentService } from './poll-comment.service';

describe('PollCommentService', () => {
  let service: PollCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
