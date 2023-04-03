import { TestBed } from '@angular/core/testing';

import { CarritoDeComprasService } from './carrito-de-compras.service';

describe('CarritoDeComprasService', () => {
  let service: CarritoDeComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoDeComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
