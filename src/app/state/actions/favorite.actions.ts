import { createAction, props } from '@ngrx/store';
import { FavoriteData } from 'src/app/core/models/favorite.model';

export const FAVORITE_ADD = 'FAVORITE_ADD';
export const FAVORITE_REMOVE = 'FAVORITE_REMOVE';
export const FAVORITE_SELECTED = 'FAVORITE_SELECTED';

export const favoriteAdd = createAction(
  FAVORITE_ADD,
  props<{
    data: FavoriteData;
    isFavorite: boolean;
  }>()
);

export const favoriteRemove = createAction(
  FAVORITE_REMOVE,
  props<{
    data: FavoriteData;
    isFavorite: boolean;
  }>()
);

export const FavoritesSelected = createAction(
  FAVORITE_SELECTED,
  props<{
    data: FavoriteData;
    isFavorite: boolean;
  }>()
);
