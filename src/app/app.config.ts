import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {provideHttpClient} from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { InMemoryDataService } from '@services/in-memory-data.service';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducer } from '@store/hero.reducer';
import { HeroEffects } from '@store/hero.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })),
    provideStore(),
    provideState({ name: 'heroes', reducer }),
    provideEffects(HeroEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
