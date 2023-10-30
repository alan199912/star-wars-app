import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from 'src/app/core/services/swapi/swapi.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Characters } from 'src/app/core/models/characters.model';
import { Films } from 'src/app/core/models/films.model';
import { StarShips } from 'src/app/core/models/starships.model';
import { Planets } from 'src/app/core/models/planets.model';
import {
  characterTemplate,
  filmsTemplate,
  planetsTemplate,
  starshipsTemplate,
} from 'src/app/core/helpers/templates.helper';

type SchemaType = 'people' | 'films' | 'planets' | 'starships';
interface Element extends Characters, Films, StarShips, Planets {}

@Component({
  selector: 'app-schema-info',
  templateUrl: './schema-info.component.html',
  styleUrls: ['./schema-info.component.scss'],
})
export class SchemaInfoComponent implements OnInit {
  public data!: Element;
  public starships: StarShips[] = [];
  public films: Films[] = [];
  public people: Characters[] = [];
  public planets: Planets[] = [];
  public schema!: SchemaType;
  private onDestroy$: Subject<void> = new Subject();

  get getName(): string {
    return this.data && this.data?.hasOwnProperty('name') ? this.data.name : this.data?.title;
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly swapiServices: SwapiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy$.asObservable())).subscribe({
      next: (params) => {
        this.schema = params['schema'];
        this.getSchemaById(params['id']);
      },
    });
  }

  public getSchemaById(id: string): void {
    this.swapiServices.getSchemaById(this.schema, id).subscribe({
      next: (res) => {
        this.data = res;

        switch (this.schema) {
          case 'people':
            this.loadStarships(this.data.starships);
            this.loadFilms(this.data.films);
            break;
          case 'films':
            this.loadPeople(this.data.characters);
            this.loadPlanets(this.data.planets);
            this.loadStarships(this.data.starships);
            break;
          case 'planets':
            this.loadPeople(this.data.residents);
            this.loadFilms(this.data.films);
            break;
          case 'starships':
            this.loadPeople(this.data.pilots);
            this.loadFilms(this.data.films);
            break;
          default:
            break;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private loadStarships(starshipUrls: string[]): void {
    this.swapiServices.getStarshipsById(starshipUrls).subscribe((starships) => {
      this.starships = starships;
    });
  }

  private loadFilms(filmUrls: string[]): void {
    this.swapiServices.getFilmsById(filmUrls).subscribe((films) => {
      this.films = films;
    });
  }

  private loadPeople(peopleUrls: string[]): void {
    this.swapiServices.getPeopleById(peopleUrls).subscribe((people) => {
      this.people = people;
    });
  }

  private loadPlanets(planetsUrls: string[]): void {
    this.swapiServices.getPlanetsById(planetsUrls).subscribe((planets) => {
      this.planets = planets;
    });
  }

  public loadInformationCharacter(data: Characters) {
    return characterTemplate(data, this.starships, this.films);
  }

  public loadInformationPlanets(data: Planets) {
    return planetsTemplate(data, this.people, this.films);
  }

  public loadInformationStarships(data: StarShips) {
    return starshipsTemplate(data, this.people, this.films);
  }

  public loadInformationFilms(data: Films) {
    return filmsTemplate(data, this.people, this.starships, this.planets);
  }
}
