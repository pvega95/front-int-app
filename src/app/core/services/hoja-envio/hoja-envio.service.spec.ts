import { TestBed } from '@angular/core/testing';

import { HojaEnvioService } from './hoja-envio.service';

describe('HojaEnvioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HojaEnvioService = TestBed.get(HojaEnvioService);
    expect(service).toBeTruthy();
  });
});
