import { TestBed } from '@angular/core/testing';

import { GuiaRemisionService } from './guia-remision.service';

describe('GuiaRemisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuiaRemisionService = TestBed.get(GuiaRemisionService);
    expect(service).toBeTruthy();
  });
});
