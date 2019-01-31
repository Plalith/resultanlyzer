import { TestBed, async, inject } from '@angular/core/testing';

import { RoutcheckGuard } from './routcheck.guard';

describe('RoutcheckGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutcheckGuard]
    });
  });

  it('should ...', inject([RoutcheckGuard], (guard: RoutcheckGuard) => {
    expect(guard).toBeTruthy();
  }));
});
