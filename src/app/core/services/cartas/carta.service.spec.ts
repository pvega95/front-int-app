import { TestBed } from '@angular/core/testing';

import { CartaService } from './carta.service';

describe('CartaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartaService = TestBed.get(CartaService);
    expect(service).toBeTruthy();
  });
});
