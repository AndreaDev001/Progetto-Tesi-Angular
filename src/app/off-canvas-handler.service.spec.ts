import { TestBed } from '@angular/core/testing';

import { OffCanvasHandlerService } from './off-canvas-handler.service';

describe('OffCanvasHandlerService', () => {
  let service: OffCanvasHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffCanvasHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
