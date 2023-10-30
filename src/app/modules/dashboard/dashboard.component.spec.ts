import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { Characters } from 'src/app/core/models/characters.model';
import { ElementWithType } from 'src/app/core/models/favorite.model';
import { of } from 'rxjs';
import { Planets } from 'src/app/core/models/planets.model';
import { favoriteAdd } from 'src/app/state/actions/favorite.actions';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables', () => {
    expect(component.characters).toEqual([]);
    expect(component.favoritePlanets).toEqual([]);
    expect(component.favoriteDataPlanets).toEqual([]);
    expect(component.favoriteDataCharacters).toEqual([]);
    expect(component.dataFavorites).toEqual({
      people: [],
      films: [],
      starships: [],
      planets: [],
    });
  });

  it('should call getCharacters method when ngOnInit is called', () => {
    const mockSwapiService = jasmine.createSpyObj('SwapiService', ['getPopularCharacters']);
    const mockStore = jasmine.createSpyObj('Store', ['select']);

    mockSwapiService.getPopularCharacters.and.returnValue(
      of([
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
        {
          name: 'C-3PO',
          height: '167',
          mass: '75',
          hair_color: 'n/a',
          skin_color: 'gold',
          eye_color: 'yellow',
          birth_year: '112BBY',
          gender: 'n/a',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/4/',
            'https://swapi.dev/api/films/5/',
            'https://swapi.dev/api/films/6/',
          ],
          species: ['https://swapi.dev/api/species/2/'],
          vehicles: [],
          starships: [],
          created: '2014-12-10T15:10:51.357000Z',
          edited: '2014-12-20T21:17:50.309000Z',
          url: 'https://swapi.dev/api/people/2/',
        },
        {
          name: 'R2-D2',
          height: '96',
          mass: '32',
          hair_color: 'n/a',
          skin_color: 'white, blue',
          eye_color: 'red',
          birth_year: '33BBY',
          gender: 'n/a',
          homeworld: 'https://swapi.dev/api/planets/8/',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/4/',
            'https://swapi.dev/api/films/5/',
            'https://swapi.dev/api/films/6/',
          ],
          species: ['https://swapi.dev/api/species/2/'],
          vehicles: [],
          starships: [],
          created: '2014-12-10T15:11:50.376000Z',
          edited: '2014-12-20T21:17:50.311000Z',
          url: 'https://swapi.dev/api/people/3/',
        },
        {
          name: 'Darth Vader',
          height: '202',
          mass: '136',
          hair_color: 'none',
          skin_color: 'white',
          eye_color: 'yellow',
          birth_year: '41.9BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/6/',
          ],
          species: [],
          vehicles: [],
          starships: ['https://swapi.dev/api/starships/13/'],
          created: '2014-12-10T15:18:20.704000Z',
          edited: '2014-12-20T21:17:50.313000Z',
          url: 'https://swapi.dev/api/people/4/',
        },
        {
          name: 'Leia Organa',
          height: '150',
          mass: '49',
          hair_color: 'brown',
          skin_color: 'light',
          eye_color: 'brown',
          birth_year: '19BBY',
          gender: 'female',
          homeworld: 'https://swapi.dev/api/planets/2/',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/6/',
          ],
          species: [],
          vehicles: ['https://swapi.dev/api/vehicles/30/'],
          starships: [],
          created: '2014-12-10T15:20:09.791000Z',
          edited: '2014-12-20T21:17:50.315000Z',
          url: 'https://swapi.dev/api/people/5/',
        },
      ])
    );

    mockStore.select.and.returnValue(
      of({
        data: {
          people: [],
          films: [],
          starships: [],
          planets: [],
        },
      })
    );

    const component = new DashboardComponent(mockSwapiService, mockStore);

    component.ngOnInit();

    expect(mockSwapiService.getPopularCharacters).toHaveBeenCalled();
  });

  it('should return an object with the same properties as the input character object, plus a title property set to an empty string', () => {
    const character: Characters = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'Tatooine',
      films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
      species: ['Human'],
      vehicles: ['Snowspeeder', 'Imperial Speeder Bike'],
      starships: ['X-wing', 'Imperial Speeder Bike'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };

    const element: ElementWithType = component.characterToElement(character);

    expect(element).toEqual({
      ...character,
      title: '',
    });
  });

  it('should add character to favorites and mark it as favorite when character is not in favorites list', () => {
    const data: Characters = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'Tatooine',
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
      isFavorite: false,
    };

    const swapiServiceMock = jasmine.createSpyObj('SwapiService', ['getPopularCharacters']);
    const storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    const dashboardComponent = new DashboardComponent(swapiServiceMock, storeMock);
    dashboardComponent.addToFavoriteCharacters(data);

    expect(dashboardComponent.favoriteDataCharacters).toEqual(
      jasmine.arrayContaining([jasmine.objectContaining(data)])
    );
    const isFavorite = dashboardComponent.characters.find((character) => character.name === data.name)
      ?.isFavorite;
    expect(isFavorite).toBe(undefined);
  });

  it('should add a planet to favoriteDataPlanets and update store', () => {
    const swapiServiceMock = jasmine.createSpyObj('SwapiService', ['getPopularCharacters']);
    const storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    const dashboard = new DashboardComponent(swapiServiceMock, storeMock);
    const data: Planets = {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      residents: [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
        'https://swapi.dev/api/people/4/',
        'https://swapi.dev/api/people/6/',
        'https://swapi.dev/api/people/7/',
        'https://swapi.dev/api/people/8/',
        'https://swapi.dev/api/people/9/',
        'https://swapi.dev/api/people/11/',
        'https://swapi.dev/api/people/43/',
        'https://swapi.dev/api/people/62/',
      ],
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi.dev/api/planets/1/',
      isFavorite: false,
    };

    dashboard.addToFavoritePlanets(data);

    expect(dashboard.favoriteDataPlanets).toEqual(
      jasmine.arrayContaining([jasmine.objectContaining(data)])
    );
    expect(dashboard['store'].dispatch).toHaveBeenCalledWith(
      favoriteAdd({
        data: { ...dashboard.dataFavorites, planets: [data] },
        isFavorite: true,
      })
    );
  });
});
