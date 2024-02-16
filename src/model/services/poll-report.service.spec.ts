import { TestBed } from '@angular/core/testing';

import { PollReportService } from './poll-report.service';

describe('PollReportService', () => {
  let service: PollReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
