import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../core/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add Item': props<{ product: Product; quantity?: number }>(),
    'Remove Item': props<{ productId: number }>(),
    'Update Quantity': props<{ productId: number; quantity: number }>(),
    'Clear Cart': emptyProps(),
  },
});
