import { TestBed } from '@angular/core/testing';

import { ActiveSessionService } from './active-session.service';

describe('ActiveSessionService', () => {
  let service: ActiveSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
