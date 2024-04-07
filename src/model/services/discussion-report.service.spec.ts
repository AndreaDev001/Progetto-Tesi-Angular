import { TestBed } from '@angular/core/testing';

import { DiscussionReportService } from './discussion-report.service';

describe('DiscussionReportService', () => {
  let service: DiscussionReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscussionReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
