import { TestBed } from '@angular/core/testing';

import { TaskURLService } from './task-url.service';

describe('TaskURLService', () => {
  let service: TaskURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
