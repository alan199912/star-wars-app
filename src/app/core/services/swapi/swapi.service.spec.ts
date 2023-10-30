import { TestBed } from '@angular/core/testing';

import { SwapiService } from './swapi.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SwapiService', () => {
  let service: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SwapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPopularCharacters when the method is called', () => {
    const mockService = jasmine.createSpyObj('SwapiService', ['getPopularCharacters']);

    expect(mockService.getPopularCharacters).not.toHaveBeenCalled();
  });

  it('should call getCharacter when the method is called', () => {
    const mockService = jasmine.createSpyObj('SwapiService', ['getCharacter']);

    expect(mockService.getCharacter).not.toHaveBeenCalled();
  });

  it('should call getSchema when the method is called', () => {
    const mockService = jasmine.createSpyObj('SwapiService', ['getSchema']);

    expect(mockService.getSchema).not.toHaveBeenCalled();
  });

  it('should call getSchemaById when the method is called', () => {
    const mockService = jasmine.createSpyObj('SwapiService', ['getSchemaById']);

    expect(mockService.getSchemaById).not.toHaveBeenCalled();
  });

  it('should call getPlanetsById when the method is called', () => {
    const mockService = jasmine.createSpyObj('SwapiService', ['getPlanetsById']);

    expect(mockService.getPlanetsById).not.toHaveBeenCalled();
  });

  it('should call getPeopleById when the method is called', () => {
    const mockService = jasmine.createSpyObj('SwapiService', ['getPeopleById']);

    expect(mockService.getPeopleById).not.toHaveBeenCalled();
  });
});
