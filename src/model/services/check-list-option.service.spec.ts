import { TestBed } from '@angular/core/testing';

import { CheckListOptionService } from './check-list-option.service';

describe('CheckListOptionService', () => {
  let service: CheckListOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckListOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
