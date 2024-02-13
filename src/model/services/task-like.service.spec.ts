import { TestBed } from '@angular/core/testing';

import { TaskLikeService } from './task-like.service';

describe('TaskLikeService', () => {
  let service: TaskLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
