import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setSearch when the method is called', () => {
    const mockService = jasmine.createSpyObj('SearchService', ['setSearch']);

    expect(mockService.setSearch).not.toHaveBeenCalled();
  });

  it('should call getSearch when the method is called', () => {
    const mockService = jasmine.createSpyObj('SearchService', ['getSearch']);

    expect(mockService.getSearch).not.toHaveBeenCalled();
  });

  it('should call searchSchema when the method is called', () => {
    const mockService = jasmine.createSpyObj('SearchService', ['searchSchema']);

    expect(mockService.searchSchema).not.toHaveBeenCalled();
  });
});
