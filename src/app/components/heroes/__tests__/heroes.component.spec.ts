import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { MockStore, createMockStore } from '@ngrx/store/testing';
import { MockBuilder, MockRender, MockedComponentFixture } from 'ng-mocks';

import { HeroesState } from '@store/hero.reducer';
import { HeroSelectors } from '@store/hero.selector';
import { HeroActions } from '@store/hero.action';
import { HeroesComponent } from '../heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: MockedComponentFixture<HeroesComponent>;
  const store: MockStore<HeroesState> = createMockStore({
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
          }
        ]
      }
    ]
  });
  const dispatchSpy = jest.spyOn(store, 'dispatch');
  const loadHeroesSpy = jest.spyOn(HeroActions, 'loadHeroes');
  const addHeroSpy = jest.spyOn(HeroActions, 'addHero');
  const DeleteHeroSpy = jest.spyOn(HeroActions, 'deleteHero');

  beforeEach(async () => {
    await MockBuilder(HeroesComponent)
      .mock(Store, store)
      .keep(NgIf)
      .keep(NgFor)
      .keep(UpperCasePipe)
      .keep(AsyncPipe);

    fixture = MockRender(HeroesComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(loadHeroesSpy).toHaveBeenCalled();
    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch addHero action on clicking add button', () => {
    const el = fixture.point.nativeElement;
    const heroNameInput = el.querySelector('#new-hero');
    const addBtn = el.querySelector('.add-btn');

    heroNameInput.value = 'New Hero ';
    addBtn.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(addHeroSpy).toHaveBeenCalledWith({ name: 'New Hero' });

    expect(component.heroName.nativeElement.value).toBe('');
  });

  it('should not add Hero when input is empty', () => {
    const el = fixture.point.nativeElement;
    const heroNameInput = el.querySelector('#new-hero');
    const addBtn = el.querySelector('.add-btn');

    heroNameInput.value = '';
    addBtn.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(addHeroSpy).not.toHaveBeenCalled();
  });

  it('should dispatch deleteHero action on clicking delete button', () => {
    const el = fixture.point.nativeElement;
    const firstDeleteBtn = el.querySelectorAll('.delete-btn')[0];

    firstDeleteBtn.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(DeleteHeroSpy).toHaveBeenCalledWith({ id: 1 });
  });
});
