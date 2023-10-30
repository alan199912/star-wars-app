import { Characters } from './characters.model';
import { Films } from './films.model';
import { Planets } from './planets.model';
import { StarShips } from './starships.model';

export interface Favorite {
  data: FavoriteData;
}

export interface FavoriteData {
  people: Characters[];
  films: Films[];
  starships: StarShips[];
  planets: Planets[];
}

export class Element {
  name: string;
  title: string;
  url: string;

  constructor(name: string, title: string, url: string) {
    this.name = name;
    this.title = title;
    this.url = url;
  }
}

export type ElementWithType = Element & (Characters | Planets | StarShips | Films);
