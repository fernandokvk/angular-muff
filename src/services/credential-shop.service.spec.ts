import { TestBed } from '@angular/core/testing';

import { CredentialShopService } from './credential-shop.service';

describe('CredentialShopService', () => {
  let service: CredentialShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
