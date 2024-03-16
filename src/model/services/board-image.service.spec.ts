import { TestBed } from '@angular/core/testing';

import { BoardImageService } from './board-image.service';

describe('BoardImageService', () => {
  let service: BoardImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
