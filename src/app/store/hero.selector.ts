import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HeroesState } from './hero.reducer';
import { Hero } from '@model/hero';

export const selectHeroesState = createFeatureSelector<HeroesState>('heroes');

export const selectAllHeroes = createSelector(
  selectHeroesState,
  (state: HeroesState) => state.heroes
);

export const selectHeroesLoading = createSelector(
  selectHeroesState,
  (state: HeroesState) => state.loading
);

export const selectHeroesError = createSelector(
  selectHeroesState,
  (state: HeroesState) => state.error
);

export const selectSearchResults = createSelector(
  selectHeroesState,
  (state: HeroesState) => state.searchResults
);

export const selectQuery = createSelector(
  selectHeroesState,
  (state: HeroesState) =>  state.query
);

export const selectHeroById = (id: number) => createSelector(
  selectAllHeroes,
  (heroes: Hero[]) => heroes.find(hero => hero.id === id)
);
