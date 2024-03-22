import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { HeroService } from '@services/hero.service';
import * as HeroActions from './hero.action';

@Injectable()
export class HeroEffects {
  constructor(
    private actions$: Actions,
    private heroService: HeroService
  ) {}

  loadHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.loadHeroes),
      mergeMap(() =>
        this.heroService.getHeroes().pipe(
          map((heroes) => HeroActions.loadHeroesSuccess({ heroes })),
          catchError((error) => of(HeroActions.loadHeroesFailure({ error })))
        )
      )
    )
  );

  addHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.addHero),
      mergeMap(({ name }) =>
        this.heroService.addHero({ name }).pipe(
          map((addedHero) => HeroActions.addHeroSuccess({ hero: addedHero })),
          catchError((error) => of(HeroActions.addHeroFailure({ error })))
        )
      )
    )
  );

  updateHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.updateHero),
      mergeMap(({ hero }) =>
        this.heroService.updateHero(hero).pipe(
          map(() => HeroActions.updateHeroSuccess({ hero })),
          catchError((error) => of(HeroActions.updateHeroFailure({ error })))
        )
      )
    )
  );

  deleteHero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HeroActions.deleteHero),
      mergeMap(({ id }) =>
        this.heroService.deleteHero(id).pipe(
          map(() => HeroActions.deleteHeroSuccess({ id })),
          catchError((error) => of(HeroActions.deleteHeroFailure({ error })))
        )
      )
    )
  );
}
