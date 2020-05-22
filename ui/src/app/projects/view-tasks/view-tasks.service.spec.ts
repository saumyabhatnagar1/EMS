import { TestBed } from '@angular/core/testing';

import { ViewTasksService } from './view-tasks.service';

describe('ViewTasksService', () => {
  let service: ViewTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
