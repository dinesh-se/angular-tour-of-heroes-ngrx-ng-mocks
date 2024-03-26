import { createReducer, on, Action } from '@ngrx/store';

import * as HeroActions from './hero.action';
import { Hero } from '@model/hero';

export interface HeroesState {
  query: string;
  searchResults: Hero[];
  heroes: Hero[];
  loading: boolean;
  error: any;
}

export const initialState: HeroesState = {
  query: '',
  searchResults: [],
  heroes: [],
  loading: false,
  error: null
};

const heroesReducer = createReducer(
  initialState,

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


  on(HeroActions.searchHeroes, (state, { query }) => ({
    ...state,
    query,
  })),
  on(HeroActions.searchHeroesSuccess, (state, { searchResults }) => ({
    ...state,
    searchResults,
  })),
  on(HeroActions.searchHeroesFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(HeroActions.addHeroSuccess, (state, { hero }) => ({
    ...state,
    heroes: [...state.heroes, hero]
  })),
  on(HeroActions.addHeroFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(HeroActions.updateHeroSuccess, (state, { hero }) => ({
    ...state,
    heroes: state.heroes.map(h => (h.id === hero.id ? hero : h))
  })),
  on(HeroActions.updateHeroFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(HeroActions.deleteHeroSuccess, (state, { id }) => ({
    ...state,
    heroes: state.heroes.filter(h => h.id !== id)
  })),
  on(HeroActions.deleteHeroFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: HeroesState | undefined, action: Action) {
  return heroesReducer(state, action);
}
