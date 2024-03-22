import { createAction, props } from '@ngrx/store';

import { Hero } from '@model/hero';

// Action to load heroes from the server
export const loadHeroes = createAction('[Heroes] Load Heroes');

// Action dispatched when heroes are successfully loaded
export const loadHeroesSuccess = createAction(
  '[Heroes] Load Heroes Success',
  props<{ heroes: Hero[] }>()
);

// Action dispatched when there's an error loading heroes
export const loadHeroesFailure = createAction(
  '[Heroes] Load Heroes Failure',
  props<{ error: any }>()
);

// Action to add a hero
export const addHero = createAction(
  '[Heroes] Add Hero',
  props<{ name: string }>()
);

// Action dispatched when a hero is successfully added
export const addHeroSuccess = createAction(
  '[Heroes] Add Hero Success',
  props<{ hero: Hero }>()
);

// Action dispatched when there's an error adding a hero
export const addHeroFailure = createAction(
  '[Heroes] Add Hero Failure',
  props<{ error: any }>()
);

// Action to update a hero
export const updateHero = createAction(
  '[Heroes] Update Hero',
  props<{ hero: Hero }>()
);

// Action dispatched when a hero is successfully updated
export const updateHeroSuccess = createAction(
  '[Heroes] Update Hero Success',
  props<{ hero: Hero }>()
);

// Action dispatched when there's an error updating a hero
export const updateHeroFailure = createAction(
  '[Heroes] Update Hero Failure',
  props<{ error: any }>()
);

// Action to delete a hero
export const deleteHero = createAction(
  '[Heroes] Delete Hero',
  props<{ id: number }>()
);

// Action dispatched when a hero is successfully deleted
export const deleteHeroSuccess = createAction(
  '[Heroes] Delete Hero Success',
  props<{ id: number }>()
);

// Action dispatched when there's an error deleting a hero
export const deleteHeroFailure = createAction(
  '[Heroes] Delete Hero Failure',
  props<{ error: any }>()
);
