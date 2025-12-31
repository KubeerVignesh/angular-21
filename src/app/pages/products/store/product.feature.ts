import { createFeature, createReducer, on } from '@ngrx/store';
import { productActions } from './product.action';
import { product } from './product.model';

export interface ProductState {
  products: product[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}
export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  totalCount: 0,
};

export const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(productActions.getProducts, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        products: [],
      };
    }),
    on(productActions.getProductsSuccess, (state, action) => {
      return {
        ...state,
        products: action.products.data,
        loading: false,
        error: null,
        totalCount: action.products.count,
      };
    }),
    on(productActions.getProductsFailure, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error,
        products: [],
      };
    }),
  ),
});
