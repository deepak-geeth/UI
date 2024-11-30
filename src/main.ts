import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './app/store/user/user.reducer';
import { UserEffects } from './app/store/user/user.effects';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ user: userReducer }),
    provideEffects(UserEffects),
    provideStoreDevtools(),
    importProvidersFrom(StoreModule.forRoot({ user: userReducer })), // Ensure StoreModule is provided
    importProvidersFrom(EffectsModule.forRoot([UserEffects])),
  ],
}).catch(err => console.error(err));
