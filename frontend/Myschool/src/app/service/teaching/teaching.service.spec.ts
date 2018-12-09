import { TestBed } from '@angular/core/testing';

import { TeachingService } from './taching.service';

describe('TachingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeachingService = TestBed.get(TeachingService);
    expect(service).toBeTruthy();
  });
});
