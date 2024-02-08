import { TestBed } from '@angular/core/testing';

import { TaskAssigmentService } from './task-assigment.service';

describe('TaskAssigmentService', () => {
  let service: TaskAssigmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskAssigmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
