import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, createMockStore } from '@ngrx/store/testing';
import { MockBuilder, MockRender, MockedComponentFixture } from 'ng-mocks';
import { of } from 'rxjs';

import { HeroesState } from '@store/hero.reducer';
import { HeroSelectors } from '@store/hero.selector';
import { HeroActions } from '@store/hero.action';
import { HeroDetailComponent } from '../hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: MockedComponentFixture<HeroDetailComponent>;
  const store: MockStore<HeroesState> = createMockStore<HeroesState>();
  const selectHeroByIdSpy = jest.spyOn(HeroSelectors, 'selectHeroById');
  const dispatchSpy = jest.spyOn(store, 'dispatch');
  const updateHeroSpy = jest.spyOn(HeroActions, 'updateHero');
  const selectHeroSpy = jest.spyOn(store, 'select')
    .mockImplementation(() => {
      return of({
        id: '1',
        name: 'Hero 1'
      });
    });

  beforeEach(async () => {
    await MockBuilder(HeroDetailComponent)
      .provide({
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: convertToParamMap({ id: 1 })
          }
        }
      })
      .mock(Store, store, { precise: true })
      .keep(NgIf)
      .keep(AsyncPipe)
      .keep(UpperCasePipe);

    fixture = MockRender(HeroDetailComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create with hero details', () => {
    const input = fixture.point.nativeElement.querySelector('input');

    expect(component).toBeTruthy();
    expect(selectHeroSpy).toHaveBeenCalled();
    expect(selectHeroByIdSpy).toHaveBeenCalledWith(1);
    expect(input.value).toBe('Hero 1');
    expect(fixture).toMatchSnapshot();
  });

  it('should save updated hero details', () => {
    const goBackSpy = jest.spyOn(component, 'goBack');
    const saveButton = fixture.point.nativeElement.querySelector('.save-btn');
    const input = fixture.point.nativeElement.querySelector('input');
    input.value = 'Updated Hero 1';
    const updatedHero = {
      hero: {
        id: "1",
        name: 'Updated Hero 1'
      }
    };

    saveButton.click();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(updateHeroSpy).toHaveBeenCalledWith(updatedHero);
    expect(goBackSpy).toHaveBeenCalled();
  });

  it('should not save hero details when hero name is empty', () => {
    const goBackSpy = jest.spyOn(component, 'goBack');
    const saveButton = fixture.point.nativeElement.querySelector('.save-btn');
    const input = fixture.point.nativeElement.querySelector('input');
    input.value = '';

    saveButton.click();

    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(updateHeroSpy).not.toHaveBeenCalled();
    expect(goBackSpy).not.toHaveBeenCalled();
  });
});
