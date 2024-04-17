import { fakeAsync, tick } from '@angular/core/testing';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import {
  MockBuilder,
  MockComponent,
  MockRender,
  NG_MOCKS_ROOT_PROVIDERS,
  ngMocks,
  MockedComponentFixture
} from 'ng-mocks';

import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { HeroesComponent } from '@components/heroes/heroes.component';
import { AppComponent } from '../app.component';
import { routes } from '../app.routes';

describe('AppComponent Router', () => {
  beforeEach(async () => {
    await MockBuilder(
      [
        RouterModule.forRoot(routes),
        NG_MOCKS_ROOT_PROVIDERS,
        MockComponent(DashboardComponent),
        MockComponent(HeroesComponent)
      ],
    );
  });

  it('renders /dashboard with DashboardComponent', fakeAsync(() => {
    const fixture = MockRender(RouterOutlet, {});
    const router: Router = fixture.point.injector.get(Router);
    const location: Location = fixture.point.injector.get(Location);

    location.go('/dashboard');
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation());
      tick();
    }

    expect(location.path()).toEqual('/dashboard');
    expect(() => ngMocks.find(DashboardComponent)).not.toThrow();
  }));

  it('renders /heroes with HeroesComponent', fakeAsync(() => {
    const fixture = MockRender(RouterOutlet, {});
    const router: Router = fixture.point.injector.get(Router);
    const location: Location = fixture.point.injector.get(Location);

    location.go('/heroes');
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation());
      tick();
    }

    expect(location.path()).toEqual('/heroes');
    expect(() => ngMocks.find(HeroesComponent)).not.toThrow();
  }));
});

describe('AppComponent', () => {
  let fixture: MockedComponentFixture<AppComponent>;

  beforeEach(async () => {
    await MockBuilder(AppComponent);
    fixture = MockRender(AppComponent);
  });

  it('should create the app component', () => {
    const app = fixture.point.componentInstance;

    expect(app).toBeTruthy();
    expect(app.title).toEqual('Tour of Heroes');
    expect(fixture).toMatchSnapshot();
  });
});
