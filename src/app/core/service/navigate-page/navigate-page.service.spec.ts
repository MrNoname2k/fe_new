import { TestBed } from '@angular/core/testing';

import { NavigatePageService } from './navigate-page.service';

describe('NavigatePageService', () => {
  let service: NavigatePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigatePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
