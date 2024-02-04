import { TestBed } from '@angular/core/testing';

import { AuthenticationHandlerService } from './authentication-handler.service';

describe('AuthenticationHandlerService', () => {
  let service: AuthenticationHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
