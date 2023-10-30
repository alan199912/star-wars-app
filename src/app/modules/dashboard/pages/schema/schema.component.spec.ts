import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaComponent } from './schema.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Characters } from 'src/app/core/models/characters.model';

describe('SchemaComponent', () => {
  let component: SchemaComponent;
  let fixture: ComponentFixture<SchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchemaComponent],
      imports: [RouterTestingModule, HttpClientModule, StoreModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(SchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables', () => {
    expect(component.data).toEqual([]);
    expect(component.title).toBeUndefined();
    expect(component.isFavorites).toBeFalsy();
    expect(component.dataFavorites).toEqual({
      people: [],
      films: [],
      starships: [],
      planets: [],
    });
    expect(component.favoriteData).toEqual([]);
    expect(component.schema).toBeUndefined();
    expect(component['page']).toEqual(1);
    expect(component['isAllDataLoaded']).toBeFalsy();
    expect(component['onDestroy$']).toBeDefined();
  });

  it('should call ngOnInit when the component is initialized', () => {
    spyOn(SchemaComponent.prototype, 'ngOnInit');

    const schemaComponent = new SchemaComponent(
      jasmine.createSpyObj('ActivatedRoute', ['params']),
      jasmine.createSpyObj('SwapiService', ['getSchema']),
      jasmine.createSpyObj('Store', ['select'])
    );

    schemaComponent.ngOnInit();

    expect(schemaComponent.ngOnInit).toHaveBeenCalled();
  });

  it('should retrieve data from SWAPI service and add it to existing data', () => {
    const mockData = { results: [{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }] };

    const mockService = jasmine.createSpyObj('SwapiService', ['getSchema']);
    mockService.getSchema.and.returnValue(of(mockData));

    const schemaComponent = new SchemaComponent(
      jasmine.createSpyObj('ActivatedRoute', ['params']),
      mockService,
      jasmine.createSpyObj('Store', ['select'])
    );

    schemaComponent.schema = 'people';
    schemaComponent.getSchema();

    expect(schemaComponent.data.length).toBe(2);
    expect(schemaComponent.data[0].name).toBe('Luke Skywalker');
    expect(schemaComponent.data[1].name).toBe('Darth Vader');
  });

  it('should increment page variable and call getSchema method when there is more data to load', () => {
    const mockData = { results: [{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }] };

    const mockService = jasmine.createSpyObj('SwapiService', ['getSchema']);
    mockService.getSchema.and.returnValue(of(mockData));

    const schemaComponent = new SchemaComponent(
      jasmine.createSpyObj('ActivatedRoute', ['params']),
      mockService,
      jasmine.createSpyObj('Store', ['select'])
    );
    schemaComponent['isAllDataLoaded'] = false;
    schemaComponent['page'] = 1;

    spyOn(schemaComponent, 'getSchema');

    window.innerHeight = 500;
    window.scrollY = 1000;
    schemaComponent.onScroll();

    expect(schemaComponent['page']).toBe(2);
    expect(schemaComponent.getSchema).toHaveBeenCalled();
  });

  it('should select data from the store when getFavorites is defined', () => {
    const mockService = jasmine.createSpyObj('SwapiService', ['getSchema']);
    const storeMock = jasmine.createSpyObj('Store', ['select']);
    storeMock.select.and.returnValue(
      of({
        data: {
          people: [],
          films: [],
          starships: [],
          planets: [],
        },
      })
    );

    const schemaComponent = new SchemaComponent(
      jasmine.createSpyObj('ActivatedRoute', ['params']),
      mockService,
      storeMock
    );

    schemaComponent.getFavorites();

    expect(schemaComponent.getFavorites).toBeDefined();
  });

  it('should add element to favoriteData when it doesnt exist', () => {
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
      films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
      species: ['Human'],
      vehicles: ['Snowspeeder', 'Imperial Speeder Bike'],
      starships: ['X-wing', 'Imperial Speeder Bike'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };

    const mockService = jasmine.createSpyObj('SwapiService', ['getSchema']);
    const storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    const schemaComponent = new SchemaComponent(
      jasmine.createSpyObj('ActivatedRoute', ['params']),
      mockService,
      storeMock
    );

    schemaComponent.addToFavorite(data);

    expect(schemaComponent.favoriteData).toEqual(
      jasmine.arrayContaining([jasmine.objectContaining(data)])
    );
  });

  it('should call next and complete methods on the onDestroy$ subject', () => {
    const mockService = jasmine.createSpyObj('SwapiService', ['getSchema']);
    const storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    const schemaComponent = new SchemaComponent(
      jasmine.createSpyObj('ActivatedRoute', ['params']),
      mockService,
      storeMock
    );

    spyOn(schemaComponent['onDestroy$'], 'next');
    spyOn(schemaComponent['onDestroy$'], 'complete');

    schemaComponent.ngOnDestroy();

    expect(schemaComponent['onDestroy$'].next).toHaveBeenCalled();
    expect(schemaComponent['onDestroy$'].complete).toHaveBeenCalled();
  });
});
