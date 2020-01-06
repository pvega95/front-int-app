import { TestBed } from '@angular/core/testing';

import { SvgRegisterService } from './svg-register.service';

describe('SvgRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvgRegisterService = TestBed.get(SvgRegisterService);
    expect(service).toBeTruthy();
  });
});
