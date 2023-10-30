import { Component, OnInit } from '@angular/core';
import { SwapiService } from 'src/app/core/services/swapi/swapi.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Characters } from 'src/app/core/models/characters.model';
import { ElementWithType, FavoriteData } from 'src/app/core/models/favorite.model';
import { Planets } from 'src/app/core/models/planets.model';
import { favoriteAdd } from 'src/app/state/actions/favorite.actions';
import { Films } from 'src/app/core/models/films.model';
import { StarShips } from 'src/app/core/models/starships.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public characters: ElementWithType[] = [];
  public favoritePlanets: ElementWithType[] = [];
  public dataFavorites: FavoriteData = {
    people: [],
    films: [],
    starships: [],
    planets: [],
  };
  public favoriteDataPlanets: ElementWithType[] = [];
  public favoriteDataCharacters: ElementWithType[] = [];

  constructor(
    private readonly swapiService: SwapiService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getCharacters();

    this.store.select('favorite').subscribe({
      next: (response) => {
        this.favoritePlanets = response.data.planets as ElementWithType[];
        this.favoriteDataCharacters = response.data.people as ElementWithType[];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public characterToElement(character: Characters): ElementWithType {
    return {
      ...character,
      name: character.name,
      title: '',
    };
  }

  private getCharacters(): void {
    this.swapiService.getPopularCharacters().subscribe({
      next: (response) => {
        this.characters = response.map(this.characterToElement);

        for (const item of this.favoriteDataCharacters) {
          this.characters = this.characters.map((el) => {
            if ('name' in el && 'name' in item && el.name === item.name) {
              if (!item.isFavorite) {
                return { ...el, isFavorite: false };
              }

              return { ...el, isFavorite: true };
            }

            return el;
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public addToFavoriteCharacters(data: Characters | Films | StarShips | Planets): void {
    const identifier = 'name' in data && data.name;
    const favoriteIndex = this.favoriteDataCharacters.findIndex((item) => {
      if ('name' in item && item.name === identifier) {
        return true;
      }

      return false;
    });

    if (favoriteIndex !== -1) {
      this.favoriteDataCharacters = this.favoriteDataCharacters.filter((item) => {
        if ('name' in item && item.name !== identifier) {
          return true;
        }

        return false;
      });
    } else {
      this.favoriteDataCharacters = [...this.favoriteDataCharacters, data as ElementWithType];
    }

    const index = this.characters.findIndex((item) => {
      if ('name' in item && 'name' in data && item.name === data.name) {
        return true;
      }

      return false;
    });

    if (index !== -1) {
      let newcharacters = this.characters[index];
      this.characters[index].isFavorite = !this.characters[index].isFavorite;

      if (favoriteIndex !== -1) {
        newcharacters = { ...newcharacters, isFavorite: false };
      } else {
        newcharacters = { ...newcharacters, isFavorite: true };
      }

      this.characters = [
        ...this.characters.slice(0, index),
        newcharacters,
        ...this.characters.slice(index + 1, this.characters.length),
      ];
    }

    this.store.dispatch(
      favoriteAdd({
        data: { ...this.dataFavorites, people: this.favoriteDataCharacters as Array<Characters> },
        isFavorite: true,
      })
    );
  }

  public addToFavoritePlanets(data: Characters | Films | StarShips | Planets): void {
    const identifier = 'name' in data && data.name;
    const favoriteIndex = this.favoriteDataPlanets.findIndex((item) => {
      if ('name' in item && item.name === identifier) {
        return true;
      }

      return false;
    });

    if (favoriteIndex !== -1) {
      this.favoriteDataPlanets = this.favoriteDataPlanets.filter((item) => {
        if ('name' in item && item.name !== identifier) {
          return true;
        }

        return false;
      });
    } else {
      this.favoriteDataPlanets = [...this.favoriteDataPlanets, data as ElementWithType];
    }

    const index = this.favoritePlanets.findIndex((item) => {
      if ('name' in item && 'name' in data && item.name === data.name) {
        return true;
      }

      return false;
    });

    if (index !== -1) {
      let newfavoritePlanets = this.favoritePlanets[index];

      if (favoriteIndex !== -1) {
        newfavoritePlanets = { ...newfavoritePlanets, isFavorite: false };
      } else {
        newfavoritePlanets = { ...newfavoritePlanets, isFavorite: true };
      }

      this.favoritePlanets = [
        ...this.favoritePlanets.slice(0, index),
        newfavoritePlanets,
        ...this.favoritePlanets.slice(index + 1, this.favoritePlanets.length),
      ];
    }

    this.store.dispatch(
      favoriteAdd({
        data: { ...this.dataFavorites, planets: this.favoriteDataPlanets as Array<Planets> },
        isFavorite: true,
      })
    );
  }
}
