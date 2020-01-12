import { TestBed } from '@angular/core/testing';

import { HttpClienteService } from './http-cliente.service';

describe('HttpClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpClienteService = TestBed.get(HttpClienteService);
    expect(service).toBeTruthy();
  });
});
