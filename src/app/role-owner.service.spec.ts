import { TestBed } from '@angular/core/testing';

import { RoleOwnerService } from './role-owner.service';

describe('RoleOwnerService', () => {
  let service: RoleOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
