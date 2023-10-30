import { Component, OnInit, HostListener } from '@angular/core';
import { SCHEMAS } from 'src/app/core/constants/schemas.constants';
import { SearchService } from 'src/app/core/services/search/search.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ElementWithType, FavoriteData } from 'src/app/core/models/favorite.model';
import { Characters } from 'src/app/core/models/characters.model';
import { Films } from 'src/app/core/models/films.model';
import { StarShips } from 'src/app/core/models/starships.model';
import { Planets } from 'src/app/core/models/planets.model';
import { favoriteAdd } from 'src/app/state/actions/favorite.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

interface CustomChangeEvent extends Event {
  target: EventTarget & {
    value: string;
  };
}

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss'],
})
export class SearchResultPageComponent implements OnInit {
  public data: ElementWithType[] = [];
  public dataFavorites: FavoriteData = {
    people: [],
    films: [],
    starships: [],
    planets: [],
  };
  public favoriteData: ElementWithType[] = [];
  public schemas = SCHEMAS;
  public search = new FormControl('');
  public filter!: string;
  private page: number = 1;
  private isAllDataLoaded: boolean = false;

  constructor(
    private readonly searchService: SearchService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.searchService.getSearch().subscribe({
      next: (data) => {
        this.search = new FormControl(data?.search || '');
        this.filter = data?.schema || '';
        this.data = data?.data || [];
      },
      error: (error) => {
        console.log('error', error);
      },
    });

    this.searchData();
  }

  private searchData() {
    this.search.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe({
      next: (value) => {
        if (value) {
          this.data = [];
          this.page = 1;
          this.isAllDataLoaded = false;
          this.getData();
        }
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  public getData(): void {
    this.searchService
      .searchSchema(this.search.value!, this.filter, this.page)

      .subscribe({
        next: (data) => {
          this.data = [...this.data, ...data.results];

          if (data.next === null) {
            this.isAllDataLoaded = true;
          }
        },
        error: (error) => {
          console.log('error', error);
        },
      });
  }

  public onFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filter = target.value;
    this.data = [];
    this.page = 1;
    this.isAllDataLoaded = false;
    this.getData();
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !this.isAllDataLoaded) {
      this.page++;
      this.getData();
    }
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
      this.data[index].isFavorite = !this.data[index].isFavorite;

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
        data: { ...this.dataFavorites, [this.filter]: this.favoriteData },
        isFavorite: true,
      })
    );
  }
}
