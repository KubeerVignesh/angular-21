import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductService } from './product.service';
import { productActions } from './product.action';
import { switchMap, map, catchError, of } from 'rxjs';

export const productEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productActions.getProducts),
      switchMap(() => {
        return productService.getProducts().pipe(
          map((response) => {
            return productActions.getProductsSuccess({ products: response });
          }),
          catchError((err) => {
            return of(productActions.getProductsFailure({ error: err.message }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
