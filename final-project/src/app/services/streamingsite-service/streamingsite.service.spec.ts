import { TestBed } from '@angular/core/testing';

import { StreamingsiteService } from './streamingsite.service';

describe('StreamingsiteService', () => {
  let service: StreamingsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamingsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
