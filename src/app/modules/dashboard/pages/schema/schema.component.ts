import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getSchemaName } from 'src/app/core/helpers/schema.helper';
import { SwapiService } from 'src/app/core/services/swapi/swapi.service';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { favoriteAdd } from 'src/app/state/actions/favorite.actions';
import { selectFavoriteFeature } from 'src/app/state/selectors/favorite.selectors';
import { Characters } from 'src/app/core/models/characters.model';
import { Films } from 'src/app/core/models/films.model';
import { Planets } from 'src/app/core/models/planets.model';
import { StarShips } from 'src/app/core/models/starships.model';
import { ElementWithType, FavoriteData } from 'src/app/core/models/favorite.model';

type SchemaType = 'people' | 'films' | 'planets' | 'starships';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss'],
})
export class SchemaComponent implements OnInit, OnDestroy {
  public data: ElementWithType[] = [];
  public title!: string;
  public isFavorites: boolean = false;
  public dataFavorites: FavoriteData = {
    people: [],
    films: [],
    starships: [],
    planets: [],
  };
  public favoriteData: ElementWithType[] = [];
  public schema!: SchemaType;
  private page: number = 1;
  private isAllDataLoaded: boolean = false;
  private onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly swapiServices: SwapiService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy$.asObservable())).subscribe({
      next: (params) => {
        this.schema = params['schema'];
        this.title = getSchemaName(this.schema)!;
        this.data = [];
        this.getSchema();
      },
    });

    this.store
      .select(selectFavoriteFeature)
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe((data) => {
        this.dataFavorites = data.data;
      });
  }

  public getSchema(): void {
    if (this.isFavorites) {
      this.data = [];
    }

    this.isFavorites = false;

    this.swapiServices.getSchema(this.schema, this.page).subscribe({
      next: (data) => {
        this.data = [...this.data, ...data.results];

        for (const item of this.dataFavorites[this.schema]) {
          this.data = this.data.map((el) => {
            if (
              ('name' in el && 'name' in item && el.name === item.name) ||
              ('title' in el && 'title' in item && el.title === item.title)
            ) {
              if (!item.isFavorite) {
                return { ...el, isFavorite: false };
              }

              return { ...el, isFavorite: true };
            }

            return el;
          });
        }

        if (data.next === null) {
          this.isAllDataLoaded = true;
        }
      },
      error: (error) => {
        console.log('error', error);
      },
      complete: () => {},
    });
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !this.isAllDataLoaded) {
      this.page++;
      this.getSchema();
    }
  }

  public getFavorites(): void {
    this.isFavorites = true;

    this.store
      .select(selectFavoriteFeature)
      .pipe(first(), takeUntil(this.onDestroy$.asObservable()))
      .subscribe((data) => {
        this.data = data.data[this.schema] as ElementWithType[];
        this.dataFavorites = data.data;
      });
  }

  public addToFavorite(data: Characters | Films | StarShips | Planets): void {
    const identifier = 'name' in data ? data.name : 'title' in data ? data.title : '';
    const favoriteIndex = this.favoriteData.findIndex((item) => {
      if ('name' in item && item.name === identifier) {
        return true;
      }
      if ('title' in item && item.title === identifier) {
        return true;
      }
      return false;
    });

    if (favoriteIndex !== -1) {
      this.favoriteData = this.favoriteData.filter((item) => {
        if ('name' in item && item.name !== identifier) {
          return true;
        }
        if ('title' in item && item.title !== identifier) {
          return true;
        }
        return false;
      });
    } else {
      this.favoriteData = [...this.favoriteData, data as ElementWithType];
    }

    const index = this.data.findIndex((item) => {
      if ('name' in item && 'name' in data && item.name === data.name) {
        return true;
      }
      if ('title' in item && 'title' in data && item.title === data.title) {
        return true;
      }
      return false;
    });

    if (index !== -1) {
      if (!this.isFavorites) {
        this.data[index].isFavorite = !this.data[index].isFavorite;
      }

      let newData = this.data[index];

      if (favoriteIndex !== -1) {
        newData = { ...newData, isFavorite: false };
      } else {
        newData = { ...newData, isFavorite: true };
      }

      this.data = [
        ...this.data.slice(0, index),
        newData,
        ...this.data.slice(index + 1, this.data.length),
      ];
    }

    this.store.dispatch(
      favoriteAdd({
        data: { ...this.dataFavorites, [this.schema]: this.favoriteData },
        isFavorite: true,
      })
    );
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
