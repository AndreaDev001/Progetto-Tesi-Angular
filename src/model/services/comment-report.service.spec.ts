import { TestBed } from '@angular/core/testing';

import { CommentReportService } from './comment-report.service';

describe('CommentReportService', () => {
  let service: CommentReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
