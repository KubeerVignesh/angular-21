import { createFeature, createReducer, on } from '@ngrx/store';
import { CartActions, CartItem } from './cart-action';

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(CartActions.addItem, (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id,
      );

      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + (action.quantity || 1),
              }
            : item,
        );
      } else {
        // New item
        newItems = [
          ...state.items,
          {
            product: action.product,
            quantity: action.quantity || 1,
          },
        ];
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }),
    on(CartActions.removeItem, (state, action) => {
      const newItems = state.items.filter((item) => item.product.id !== action.productId);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }),
    on(CartActions.updateQuantity, (state, action) => {
      if (action.quantity <= 0) {
        // Remove item if quantity is 0 or less
        const newItems = state.items.filter((item) => item.product.id !== action.productId);
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
          itemCount: calculateItemCount(newItems),
        };
      }

      const newItems = state.items.map((item) =>
        item.product.id === action.productId ? { ...item, quantity: action.quantity } : item,
      );

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }),
    on(CartActions.clearCart, () => initialState),
  ),
  extraSelectors: ({ selectItems, selectTotal, selectItemCount }) => ({
    selectCartItems: selectItems,
    selectCartTotal: selectTotal,
    selectCartItemCount: selectItemCount,
  }),
});
