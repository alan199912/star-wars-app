import { ActionReducerMap } from '@ngrx/store';
import { InitialStateFavorite, favoriteReducer } from './reducers/favorite.reducers';

export interface AppState {
  favorite: InitialStateFavorite;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  favorite: favoriteReducer,
};
