import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { product } from './product.model';

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    'Get Products': emptyProps(),
    'Get Products Success': props<{ products: { data: product[]; count: number } }>(),
    'Get Products Failure': props<{ error: string }>(),
  },
});
