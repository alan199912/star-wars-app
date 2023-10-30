import { createReducer, on } from '@ngrx/store';
import { FavoritesSelected, favoriteAdd, favoriteRemove } from '../actions/favorite.actions';
import { FavoriteData } from 'src/app/core/models/favorite.model';

export interface InitialStateFavorite {
  data: FavoriteData;
  isFavorite: boolean;
}

export const initialState: InitialStateFavorite = {
  data: {
    people: [],
    films: [],
    planets: [],
    starships: [],
  },
  isFavorite: false,
};

export const favoriteReducer = createReducer(
  initialState,
  on(favoriteAdd, (state, { data, isFavorite }) => ({
    ...state,
    data,
    isFavorite,
  })),
  on(favoriteRemove, (state, { data, isFavorite }) => ({
    ...state,
    data,
    isFavorite,
  })),
  on(FavoritesSelected, (state) => ({
    ...state,
  }))
);
