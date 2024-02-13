import { TestBed } from '@angular/core/testing';

import { CommentLikeService } from './comment-like.service';

describe('CommentLikeService', () => {
  let service: CommentLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
