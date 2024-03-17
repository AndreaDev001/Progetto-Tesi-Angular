import { TestBed } from '@angular/core/testing';

import { TaskFileService } from './task-file.service';

describe('TaskFileService', () => {
  let service: TaskFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
