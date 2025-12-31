import { Routes } from '@angular/router';
import * as productEffect from './pages/products/store/product.effect';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { productFeature } from './pages/products/store/product.feature';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((c) => c.Register),
  },
  {
    path: '',
    loadComponent: () => import('./pages/main-layout').then((c) => c.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((c) => c.Profile),
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((c) => c.Cart),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then((c) => c.Products),
        providers: [provideEffects(productEffect), provideState(productFeature)],
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./pages/products/products').then((c) => c.Products),
      },
    ],
  },
];
