import { createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from './auth-action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../core/services/local-storage';

export const logInEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router),
    localStorage = inject(LocalStorageService),
  ) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return authService.login({ email: action.email, password: action.password }).pipe(
          tap((response) => {
            if (response.success && response.data) {
              // Store token and user in localStorage
              const { user, token } = response.data;
              if (token) {
                localStorage.setValue('token', token);
              }
              if (user) {
                localStorage.setValue('user', JSON.stringify(user));
              }
              // Update auth service signals
              router.navigate(['/products']);
            }
          }),
          map((response) => {
            if (response.success && response.data) {
              return AuthActions.loginSuccess(response.data);
            }
            return AuthActions.loginFailure({ error: response.message || 'Login failed' });
          }),
          catchError((error: HttpErrorResponse) => {
            // Extract error message from HttpErrorResponse
            const errorMessage =
              error.error?.message || error.message || 'An error occurred during login';
            console.error('Login error:', errorMessage);
            return of(AuthActions.loginFailure({ error: errorMessage }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router),
    localStorage = inject(LocalStorageService),
  ) => {
    return actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) => {
        return authService.signup(action).pipe(
          tap((response) => {
            if (response.success && response.data) {
              // Store token and user in localStorage
              const { user, token } = response.data;
              if (token) {
                localStorage.setValue('token', token);
              }
              if (user) {
                localStorage.setValue('user', JSON.stringify(user));
              }
              // Update auth service signals
              router.navigate(['/products']);
            }
          }),
          map((response) => {
            if (response.success && response.data) {
              return AuthActions.registerSuccess(response.data);
            }
            return AuthActions.registerFailure({
              error: response.message || 'Registration failed',
            });
          }),
          catchError((error: HttpErrorResponse) => {
            // Extract error message from HttpErrorResponse
            const errorMessage =
              error.error?.message || error.message || 'An error occurred during registration';
            console.error('Registration error:', errorMessage);
            return of(AuthActions.registerFailure({ error: errorMessage }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
