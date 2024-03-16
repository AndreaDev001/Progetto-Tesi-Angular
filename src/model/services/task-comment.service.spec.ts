import { TestBed } from '@angular/core/testing';

import { TaskCommentService } from './task-comment.service';

describe('TaskCommentService', () => {
  let service: TaskCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
