import { createReducer, on, Action } from '@ngrx/store';

import * as HeroActions from './hero.action';
import { Hero } from '@model/hero';

// Define the shape of the state
export interface HeroesState {
  searchResults: Hero[];
  heroes: Hero[];
  loading: boolean;
  error: any;
}

// Define the initial state
export const initialState: HeroesState = {
  searchResults: [],
  heroes: [],
  loading: false,
  error: null
};

// Create the reducer function using createReducer
const heroesReducer = createReducer(
  initialState,

  // Load Heroes actions
  on(HeroActions.loadHeroes, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(HeroActions.loadHeroesSuccess, (state, { heroes }) => ({
    ...state,
    heroes,
    loading: false
  })),
  on(HeroActions.loadHeroesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(HeroActions.searchHeroesSuccess, (state, { searchResults }) => ({
    ...state,
    searchResults,
  })),
  on(HeroActions.searchHeroesFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Add Hero actions
  on(HeroActions.addHeroSuccess, (state, { hero }) => ({
    ...state,
    heroes: [...state.heroes, hero]
  })),
  on(HeroActions.addHeroFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Update Hero actions
  on(HeroActions.updateHeroSuccess, (state, { hero }) => ({
    ...state,
    heroes: state.heroes.map(h => (h.id === hero.id ? hero : h))
  })),
  on(HeroActions.updateHeroFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Delete Hero actions
  on(HeroActions.deleteHeroSuccess, (state, { id }) => ({
    ...state,
    heroes: state.heroes.filter(h => h.id !== id)
  })),
  on(HeroActions.deleteHeroFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

// Export the reducer function
export function reducer(state: HeroesState | undefined, action: Action) {
  return heroesReducer(state, action);
}
