import { Action } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { provideMockActions } from '@ngrx/effects/testing';
import { MockBuilder, MockRender } from "ng-mocks";
import { marbles } from 'rxjs-marbles/jest';

import { HeroEffects } from "@store/hero.effects";
import { HeroActions } from "@store/hero.action";
import { Hero } from "@model/hero";
import { HeroService } from "@services/hero.service";

describe('HeroEffects', () => {
  let effects: HeroEffects;
  let actions$: Observable<Action>;
  let heroServiceMock: {
    getHeroes: jest.Mock<any>,
    searchHeroes: jest.Mock<any>,
    addHero: jest.Mock<any>,
    updateHero: jest.Mock<any>,
    deleteHero: jest.Mock<any>
  };

  beforeEach(async () => {
    actions$ = new Observable();
    await MockBuilder(HeroEffects)
      .provide(provideMockActions(() => actions$))
      .mock(HeroService, heroServiceMock);

    effects = MockRender(HeroEffects).point.componentInstance;
  });

  it('should handle loadHeroes$ with success', () => {
    const heroes: Hero[] = [
      {
        id: 1,
        name: 'Hero 1'
      },
      {
        id: 2,
        name: 'Hero 2'
      },
      {
        id: 3,
        name: 'Hero 3'
      }
    ];
    marbles(m => {
      heroServiceMock.getHeroes.mockReturnValueOnce(
        m.cold('a|', {
          a: heroes
        })
      );
      actions$ = m.cold('-a', {
        a: HeroActions.loadHeroes()
      });

      const expected = m.cold('--b', {
        b: HeroActions.loadHeroesSuccess({ heroes })
      });

      m.expect(effects.loadHeroes$).toBeObservable(expected);
    });
  });

  it('should handle loadHeroes$ with error', () => {
    const error = new Error('test');
    marbles(m => {
      heroServiceMock.getHeroes.mockReturnValueOnce(
        m.cold('--a|', {
          a: throwError(() => error)
        })
      );
      actions$ = m.hot('--a', {
        a: HeroActions.loadHeroes()
      });

      const expected = m.cold('--a', {
        a: HeroActions.loadHeroesFailure({ error })
      });

      m.expect(effects.loadHeroes$).toBeObservable(expected);
      m.flush();
    });
  });

  it('should handle searchHeroes$ with success', () => {
    const heroes: Hero[] = [
      {
        id: 1,
        name: 'Hero 1'
      },
      {
        id: 2,
        name: 'Hero 2'
      },
      {
        id: 3,
        name: 'Hero 3'
      }
    ];
    marbles(m => {
      heroServiceMock.searchHeroes.mockReturnValueOnce(
        m.cold('--a|', {
          a: heroes
        })
      );
      actions$ = m.hot('--a', {
        a: HeroActions.searchHeroes({ query: 'hero' })
      });

      const expected = m.cold('--a', {
        a: HeroActions.searchHeroesSuccess({ searchResults: heroes })
      });

      m.expect(effects.searchHeroes$).toBeObservable(expected);
    });
  });

  it('should handle searchHeroes$ with error', () => {
    const error = new Error('test');
    marbles(m => {
      heroServiceMock.searchHeroes.mockReturnValueOnce(
        m.cold('--a|', {
          a: throwError(() => error)
        })
      );
      actions$ = m.hot('--a', {
        a: HeroActions.loadHeroes()
      });

      const expected = m.cold('----a', {
        a: HeroActions.searchHeroesFailure({ error })
      });

      m.expect(effects.searchHeroes$).toBeObservable(expected);
    });
  });

  it('should handle addHero$ with success', () => {
    const hero: Hero = {
        id: 1,
        name: 'Hero 1'
      };
      marbles(m => {
      heroServiceMock.addHero.mockReturnValueOnce(
        m.cold('--a|', {
          a: hero
        })
      );
      actions$ = m.hot('--a', {
        a: HeroActions.addHero({ name: 'hero' })
      });

      const expected = m.cold('--a', {
        a: HeroActions.addHeroSuccess({ hero: hero })
      });

      m.expect(effects.addHero$).toBeObservable(expected);
    });
  });

  it('should handle addHero$ with error', () => {
    const error = new Error('test');
    marbles(m => {
      heroServiceMock.addHero.mockReturnValueOnce(
        m.cold('--a|', {
          a: throwError(() => error)
        })
      );
      actions$ = m.hot('--a', {
        a: HeroActions.addHero({ name: 'hero' })
      });

      const expected = m.cold('--a', {
        a: HeroActions.addHeroFailure({ error })
      });

      m.expect(effects.addHero$).toBeObservable(expected);
    });
  });

  it('should handle updateHero$ with success', () => {
    const hero: Hero = {
        id: 1,
        name: 'Hero 1'
      };
    marbles(m => {
      heroServiceMock.updateHero.mockReturnValueOnce(
        m.cold('--a|', {
          a: hero
        })
      );
      actions$ = m.hot('--a', {
        a: HeroActions.updateHero({ hero })
      });

      const expected = m.cold('--a', {
        a: HeroActions.updateHeroSuccess({ hero: hero })
      });

      m.expect(effects.updateHero$).toBeObservable(expected);
    });
  });

  it('should handle updateHero$ with error', () => {
    const error = new Error('test');
    marbles(m => {
      heroServiceMock.updateHero.mockReturnValueOnce(
        m.cold('--a|', {
          a: throwError(() => error)
        })
      );
      actions$ = m.hot('--a', {
        a: HeroActions.updateHero({ hero: { name: 'hero', id: 1 } })
      });

      const expected = m.cold('--a', {
        a: HeroActions.updateHeroFailure({ error })
      });

      m.expect(effects.updateHero$).toBeObservable(expected);
    });
  });

  it('should handle deleteHero$ with success', () => {
    marbles(m => {
      heroServiceMock.deleteHero.mockReturnValueOnce(
        m.cold('--a|', {
          a: { id: 1 }
        })
      );
      actions$ = m.hot('--a', {
        a: HeroActions.deleteHero({ id: 1 })
      });

      const expected = m.cold('--a', {
        a: HeroActions.deleteHeroSuccess({ id: 1 })
      });

      m.expect(effects.deleteHero$).toBeObservable(expected);
    });
  });

  it('should handle deleteHero$ with error', () => {
    const error = new Error('test');
    marbles(m => {
      heroServiceMock.deleteHero.mockReturnValueOnce(
        m.cold('--a|', {
          a: throwError(() => error)
        })
      );
      actions$ = m.hot('--a', {
        a: HeroActions.deleteHero({ id: 1 })
      });

      const expected = m.cold('--a', {
        a: HeroActions.deleteHeroFailure({ error })
      });

      m.expect(effects.deleteHero$).toBeObservable(expected);
    });
  });
});
