import { TestBed } from '@angular/core/testing';

import { AppProductConversionService } from './app-product-conversion.service';

describe('AppProductConversionService', () => {
  let service: AppProductConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppProductConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
