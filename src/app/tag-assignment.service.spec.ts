import { TestBed } from '@angular/core/testing';

import { TagAssignmentService } from './tag-assignment.service';

describe('TagAssignmentService', () => {
  let service: TagAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
