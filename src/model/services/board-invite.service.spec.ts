import { TestBed } from '@angular/core/testing';

import { BoardInviteService } from './board-invite.service';

describe('BoardInviteService', () => {
  let service: BoardInviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardInviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
