import { TestBed } from '@angular/core/testing';

import { SortingAlgoService } from './sorting-algo.service';

describe('SortingAlgoService', () => {
  let service: SortingAlgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingAlgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
