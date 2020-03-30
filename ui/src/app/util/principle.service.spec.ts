import { TestBed } from '@angular/core/testing';

import { PrincipleService } from './principle.service';

describe('PrincipleService', () => {
  let service: PrincipleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrincipleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
