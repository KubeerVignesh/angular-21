import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { logInEffect, registerEffect } from './shared/auth-store/auth-effect';
import { authFeature } from './shared/auth-store/auth-feature';
import { cartFeature } from './shared/cart-store/cart-feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideEffects({ logInEffect, registerEffect }),
    provideState(cartFeature),
    provideState(authFeature),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
};
