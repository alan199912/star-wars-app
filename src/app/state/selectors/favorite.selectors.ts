import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { InitialStateFavorite } from '../reducers/favorite.reducers';

export const selectFavoriteFeature = (state: AppState) => state.favorite;

export const selectFeatureFavorite = createSelector(
  selectFavoriteFeature,
  (state: InitialStateFavorite) => state.data
);
