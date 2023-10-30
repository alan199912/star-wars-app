import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables', () => {
    expect(component.searchForm).toBeDefined();
    expect(component.schemas).toBeDefined();
  });

  it('should not call searchSchema method and not navigate to search-result page when search form is invalid', function () {
    const mockSearchService = jasmine.createSpyObj('SearchService', ['searchSchema', 'setSearch']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const mockFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);

    mockSearchService.searchSchema.and.returnValue(
      of({
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: [
              'https://swapi.dev/api/films/1/',
              'https://swapi.dev/api/films/2/',
              'https://swapi.dev/api/films/3/',
              'https://swapi.dev/api/films/6/',
            ],
            species: [],
            vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
            starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T21:17:56.891000Z',
            url: 'https://swapi.dev/api/people/1/',
          },
        ],
      })
    );

    const component = new SearchComponent(mockFormBuilder, mockSearchService, mockRouter);
    component.searchForm = mockFormBuilder.group({
      search: ['', Validators.required],
      filter: ['', Validators.required],
    });

    component.search();

    expect(mockSearchService.searchSchema).not.toHaveBeenCalled();
    expect(mockSearchService.setSearch).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
