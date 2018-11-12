import { TestBed } from '@angular/core/testing';

import { SearchContentService } from './search-content.service';

describe('SearchContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchContentService = TestBed.get(SearchContentService);
    expect(service).toBeTruthy();
  });
});
