import { createAction, props } from '@ngrx/store';

import { Hero } from '@model/hero';

export const loadHeroes = createAction('[Heroes] Load Heroes');

export const loadHeroesSuccess = createAction(
  '[Heroes] Load Heroes Success',
  props<{ heroes: Hero[] }>()
);

export const loadHeroesFailure = createAction(
  '[Heroes] Load Heroes Failure',
  props<{ error: any }>()
);

export const searchHeroes = createAction(
  '[Heroes] Search Heroes',
  props<{ query: string }>()
);

export const searchHeroesSuccess = createAction(
  '[Heroes] Search Heroes Success',
  props<{ searchResults: Hero[] }>()
);

export const searchHeroesFailure = createAction(
  '[Heroes] Search Heroes Failure',
  props<{ error: any }>()
);

export const addHero = createAction(
  '[Heroes] Add Hero',
  props<{ name: string }>()
);

export const addHeroSuccess = createAction(
  '[Heroes] Add Hero Success',
  props<{ hero: Hero }>()
);

export const addHeroFailure = createAction(
  '[Heroes] Add Hero Failure',
  props<{ error: any }>()
);

export const updateHero = createAction(
  '[Heroes] Update Hero',
  props<{ hero: Hero }>()
);

export const updateHeroSuccess = createAction(
  '[Heroes] Update Hero Success',
  props<{ hero: Hero }>()
);

export const updateHeroFailure = createAction(
  '[Heroes] Update Hero Failure',
  props<{ error: any }>()
);

export const deleteHero = createAction(
  '[Heroes] Delete Hero',
  props<{ id: number }>()
);

export const deleteHeroSuccess = createAction(
  '[Heroes] Delete Hero Success',
  props<{ id: number }>()
);

export const deleteHeroFailure = createAction(
  '[Heroes] Delete Hero Failure',
  props<{ error: any }>()
);

export const HeroActions = {
  loadHeroes,
  loadHeroesSuccess,
  loadHeroesFailure,
  searchHeroes,
  searchHeroesSuccess,
  searchHeroesFailure,
  addHero,
  addHeroSuccess,
  addHeroFailure,
  updateHero,
  updateHeroSuccess,
  updateHeroFailure,
  deleteHero,
  deleteHeroSuccess,
  deleteHeroFailure
};
