import { TestBed } from '@angular/core/testing';

import { TaskReportService } from './task-report.service';

describe('TaskReportService', () => {
  let service: TaskReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
