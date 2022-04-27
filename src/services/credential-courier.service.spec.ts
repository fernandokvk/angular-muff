import { TestBed } from '@angular/core/testing';

import { CredentialCourierService } from './credential-courier.service';

describe('CredentialCourierService', () => {
  let service: CredentialCourierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialCourierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
