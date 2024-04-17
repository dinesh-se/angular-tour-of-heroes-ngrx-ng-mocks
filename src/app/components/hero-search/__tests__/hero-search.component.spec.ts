
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { MockBuilder, MockRender, MockedComponentFixture } from 'ng-mocks';
import { MockStore, createMockStore } from '@ngrx/store/testing';
import { interval, take } from 'rxjs';

import { HeroesState } from '@store/hero.reducer';
import { HeroSelectors } from '@store/hero.selector';
import { HeroActions } from '@store/hero.action';
import { HeroSearchComponent } from '../hero-search.component';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: MockedComponentFixture<HeroSearchComponent>;
  const store: MockStore<HeroesState> = createMockStore({
    selectors: [
      {
        selector: HeroSelectors.selectSearchResults,
        value: [
          {
            id: 1,
            name: 'Odd Hero 1'
          },
          {
            id: 3,
            name: 'Odd Hero 3'
          },
          {
            id: 5,
            name: 'Odd Hero 5'
          }
        ]
      },
      {
        selector: HeroSelectors.selectQuery,
        value: 'odd'
      }
    ]
  });
  const dispatchSpy = jest.spyOn(store, 'dispatch');
  const searchHeroesSpy = jest.spyOn(HeroActions, 'searchHeroes');

  beforeEach(async () => {
    await MockBuilder(HeroSearchComponent)
      .mock(Store, store)
      .keep(NgFor)
      .keep(NgIf)
      .keep(AsyncPipe);

    fixture = MockRender(HeroSearchComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create search with query and results', () => {
    const input = component.searchBox.nativeElement;

    expect(component).toBeTruthy();
    expect(input.value).toBe('odd');
    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch action when keys are pressed', ((done) => {
    const input = component.searchBox.nativeElement;

    input.value = 'new query';
    input.dispatchEvent(new Event('input'));
    // This is a workaround since tick with fakeAsync is not working in a Jest environment in RxJS 7.x
    // Issue: https://github.com/angular/angular/issues/44351
    interval(310).pipe(
      take(1),
    ).subscribe(() => {
      expect(dispatchSpy).toHaveBeenCalled();
      expect(searchHeroesSpy).toHaveBeenCalledWith({ query: 'new query' });
      done();
    });
  }));
});
