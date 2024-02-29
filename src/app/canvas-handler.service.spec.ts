import { TestBed } from '@angular/core/testing';

import { CanvasHandlerService } from './canvas-handler.service';

describe('CanvasHandlerService', () => {
  let service: CanvasHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
