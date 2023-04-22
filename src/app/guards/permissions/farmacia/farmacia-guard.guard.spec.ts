import { TestBed } from '@angular/core/testing';

import { FarmaciaGuardGuard } from './farmacia-guard.guard';

describe('FarmaciaGuardGuard', () => {
  let guard: FarmaciaGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FarmaciaGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
