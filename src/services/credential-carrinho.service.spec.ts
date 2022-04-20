import { TestBed } from '@angular/core/testing';

import { CredentialCarrinhoService } from './credential-carrinho.service';

describe('CarrinhoService', () => {
  let service: CarrinhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
