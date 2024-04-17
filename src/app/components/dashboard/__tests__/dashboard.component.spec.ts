import { AsyncPipe, NgFor, SlicePipe } from '@angular/common';
import { MockStore, createMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { MockBuilder, MockRender, MockedComponentFixture } from 'ng-mocks';

import { HeroSearchComponent } from '@components/hero-search/hero-search.component';
import { HeroesState } from '@store/hero.reducer';
import { HeroActions } from '@store/hero.action';
import { HeroSelectors } from '@store/hero.selector';
import { DashboardComponent } from '../dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: MockedComponentFixture<DashboardComponent>;
  let store: MockStore<HeroesState> = createMockStore({
    selectors: [
      {
        selector: HeroSelectors.selectAllHeroes,
        value: [
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
          },
          {
            id: 4,
            name: 'Hero 4'
          },
          {
            id: 5,
            name: 'Hero 5'
          },
          {
            id: 6,
            name: 'Hero 6'
          }
        ]
      }
    ]
  });
  const dispatchSpy = jest.spyOn(store, 'dispatch');

  beforeEach(async () => {
    await MockBuilder(DashboardComponent)
      .mock(HeroSearchComponent)
      .mock(Store, store)
      .keep(NgFor)
      .keep(AsyncPipe)
      .keep(SlicePipe);

    fixture = MockRender(DashboardComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create with heroes', () => {
    expect(component).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalledWith(HeroActions.loadHeroes());
    expect(fixture).toMatchSnapshot();
  });
});
