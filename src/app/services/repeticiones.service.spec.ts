import { TestBed } from '@angular/core/testing';

import { RepeticionesService } from './repeticiones.service';

describe('RepeticionesService', () => {
  let service: RepeticionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepeticionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
