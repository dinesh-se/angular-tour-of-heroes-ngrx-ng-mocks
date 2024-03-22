// selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HeroesState } from './hero.reducer';
import { Hero } from '@model/hero';

// Select the entire heroes state slice
export const selectHeroesState = createFeatureSelector<HeroesState>('heroes');

// Select the heroes array
export const selectAllHeroes = createSelector(
  selectHeroesState,
  (state: HeroesState) => state.heroes
);

// Select the loading state
export const selectHeroesLoading = createSelector(
  selectHeroesState,
  (state: HeroesState) => state.loading
);

// Select the error state
export const selectHeroesError = createSelector(
  selectHeroesState,
  (state: HeroesState) => state.error
);

// Select a hero by ID
export const selectHeroById = (id: number) => createSelector(
  selectAllHeroes,
  (heroes: Hero[]) => heroes.find(hero => hero.id === id)
);
