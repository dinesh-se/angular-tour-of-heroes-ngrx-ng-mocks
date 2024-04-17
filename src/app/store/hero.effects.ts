import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import { HeroService } from '@services/hero.service';
import * as HeroActions from './hero.action';

@Injectable()
export class HeroEffects {
  constructor(
    private actions$: Actions,
    private heroService: HeroService
  ) {}

  loadHeroes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.loadHeroes),
      switchMap(() => this.heroService.getHeroes().pipe(
        tap((heroes) => console.log('HEROES', heroes)),
        map((heroes) => HeroActions.loadHeroesSuccess({ heroes })),
        catchError((error) => of(HeroActions.loadHeroesFailure({ error })))
      ))
    )
  );

  searchHeroes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.searchHeroes),
      switchMap(({ query }) =>
        this.heroService.searchHeroes(query).pipe(
          map((searchResults) => HeroActions.searchHeroesSuccess({ searchResults })),
          catchError((error) => of(HeroActions.searchHeroesFailure({ error })))
        )
      )
    )
  );

  addHero$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.addHero),
      switchMap(({ name }) =>
        this.heroService.addHero({ name }).pipe(
          map((addedHero) => HeroActions.addHeroSuccess({ hero: addedHero })),
          catchError((error) => of(HeroActions.addHeroFailure({ error })))
        )
      )
    )
  );

  updateHero$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.updateHero),
      switchMap(({ hero }) =>
        this.heroService.updateHero(hero).pipe(
          map(() => HeroActions.updateHeroSuccess({ hero })),
          catchError((error) => of(HeroActions.updateHeroFailure({ error })))
        )
      )
    )
  );

  deleteHero$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.deleteHero),
      switchMap(({ id }) =>
        this.heroService.deleteHero(id).pipe(
          map(() => HeroActions.deleteHeroSuccess({ id })),
          catchError((error) => of(HeroActions.deleteHeroFailure({ error })))
        )
      )
    )
  );
}
