import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaInfoComponent } from './schema-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('SchemaInfoComponent', () => {
  let component: SchemaInfoComponent;
  let fixture: ComponentFixture<SchemaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchemaInfoComponent],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SchemaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializate variables', () => {
    expect(component.data).toBeUndefined();
    expect(component.starships).toEqual([]);
    expect(component.films).toEqual([]);
    expect(component.people).toEqual([]);
    expect(component.planets).toEqual([]);
    expect(component.schema).toBeUndefined();
    expect(component['onDestroy$']).toBeDefined();
  });

  it('should call ngOnInit when the component is initialized', () => {
    spyOn(SchemaInfoComponent.prototype, 'ngOnInit');

    const schemaInfoComponent = new SchemaInfoComponent(
      jasmine.createSpyObj('ActivatedRoute', ['params']),
      jasmine.createSpyObj('SwapiService', ['getSchemaById'])
    );

    schemaInfoComponent.ngOnInit();

    expect(schemaInfoComponent.ngOnInit).toHaveBeenCalled();
  });

  it('should call swapiServices.getSchemaById with the correct parameters and subscribe to the response', function () {
    const id = '1';
    const schema = 'people';
    const swapiServicesMock = jasmine.createSpyObj('SwapiService', [
      'getSchemaById',
      'getStarshipsById',
      'getFilmsById',
    ]);
    const response = { name: 'Luke Skywalker', starships: [], films: [] };

    swapiServicesMock.getSchemaById.and.returnValue(of(response));
    swapiServicesMock.getStarshipsById.and.returnValue(of([]));
    swapiServicesMock.getFilmsById.and.returnValue(of([]));

    const component = new SchemaInfoComponent(
      jasmine.createSpyObj('ActivatedRoute', ['params']),
      swapiServicesMock
    );
    component.schema = schema;

    component.getSchemaById(id);

    expect(swapiServicesMock.getSchemaById).toHaveBeenCalledWith(schema, id);
    expect(component.data).toEqual(jasmine.objectContaining(response));
  });

  it('should call swapiServices.getStarshipsById with the provided starshipUrls parameter', () => {
    const starshipUrls = ['url1', 'url2'];
    spyOn(component['swapiServices'], 'getStarshipsById').and.returnValue(of([]));

    component['loadStarships'](starshipUrls);

    expect(component['swapiServices'].getStarshipsById).toHaveBeenCalledWith(starshipUrls);
  });

  it('should call swapiServices.getFilmsById with the provided filmsUrls parameter', () => {
    const filmsUrls = ['url1', 'url2'];
    spyOn(component['swapiServices'], 'getFilmsById').and.returnValue(of([]));

    component['loadFilms'](filmsUrls);

    expect(component['swapiServices'].getFilmsById).toHaveBeenCalledWith(filmsUrls);
  });

  it('should load empty array when no peopleUrls are provided', function () {
    spyOn(component['swapiServices'], 'getPeopleById').and.returnValue(of([]));

    component['loadPeople']([]);

    expect(component.people).toEqual([]);
  });

  it('should call getPlanetsById method and update planets array', function () {
    const planetsUrls = ['url1', 'url2'];
    const planetsResponse = [{ name: 'planet1' }, { name: 'planet2' }];
    spyOn(component['swapiServices'], 'getPlanetsById').and.returnValue(of(planetsResponse));

    component['loadPlanets'](planetsUrls);

    expect(component['swapiServices'].getPlanetsById).toHaveBeenCalledWith(planetsUrls);
    expect(component.planets).toEqual(planetsResponse);
  });
});
