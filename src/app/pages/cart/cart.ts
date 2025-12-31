import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartActions } from '../../shared/cart-store/cart-action';
import { cartFeature } from '../../shared/cart-store/cart-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">Shopping Cart</h1>

      @if (cartItems().length === 0) {
        <div class="bg-white dark:bg-slate-900 rounded-lg p-12 text-center border border-slate-800">
          <svg
            class="w-24 h-24 mx-auto text-slate-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p class="text-slate-400 mb-6">Add some products to get started!</p>
          <a
            routerLink="/products"
            class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Browse Products
          </a>
        </div>
      } @else {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-4">
            @for (item of cartItems(); track item) {
              <div
                class="bg-white dark:bg-slate-900 rounded-lg p-6 flex flex-col md:flex-row gap-6 border border-slate-800"
              >
                <!-- Product Image -->
                <div class="shrink-0">
                  <img
                    [src]="item.product.imageUrl || 'https://via.placeholder.com/150'"
                    [alt]="item.product.name"
                    class="w-32 h-32 object-cover object-right rounded-lg"
                  />
                </div>

                <!-- Product Details -->
                <div class="flex-1">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {{ item.product.name }}
                  </h3>
                  <p class="text-gray-500 dark:text-white text-sm mb-4 line-clamp-2">
                    {{ item.product.description }}
                  </p>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-2xl font-bold text-indigo-400">
                        {{ item.product.price.toFixed(2) }}
                      </p>
                      <p class="text-sm text-slate-400">
                        Subtotal: {{ (item.product.price * item.quantity).toFixed(2) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Quantity Controls -->
                <div class="flex flex-col items-center justify-between">
                  <div class="flex items-center space-x-3 mb-4">
                    <button
                      (click)="updateQuantity(item.product.id, item.quantity - 1)"
                      class="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 hover:text-white text-gray-800 dark:text-white rounded hover:bg-slate-700 transition-colors border border-slate-700"
                      [disabled]="item.quantity <= 1"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="fill-slate-800"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        ></path>
                      </svg>
                    </button>
                    <span class="text-gray-900 dark:text-white font-semibold w-8 text-center">{{
                      item.quantity
                    }}</span>
                    <button
                      (click)="updateQuantity(item.product.id, item.quantity + 1)"
                      class="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 text-gray-800 dark:text-white hover:text-white rounded hover:bg-slate-700 transition-colors border border-slate-700"
                      [disabled]="item.quantity >= item.product.stock"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <button
                    (click)="removeItem(item.product.id)"
                    class="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium shadow-lg shadow-red-900/20"
                  >
                    Remove
                  </button>
                </div>
              </div>
            }
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div
              class="bg-white dark:bg-slate-900 rounded-lg p-6 sticky top-24 border border-slate-800"
            >
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Order Summary</h2>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between text-gray-900 dark:text-white">
                  <span>Items ({{ cartItemCount() }})</span>
                  <span>{{ cartTotal().toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-gray-800 dark:text-white">
                  <span>Shipping</span>
                  <span class="text-green-400">Free</span>
                </div>
                <div class="border-t border-slate-800 pt-4">
                  <div class="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                    <span>Total</span>
                    <span class="text-indigo-400">{{ cartTotal().toFixed(2) }}</span>
                  </div>
                </div>
              </div>

              <app-button color="accent" size="lg" class="my-2 w-full">
                Proceed to Checkout
              </app-button>

              <app-button (click)="clearCart()" color="ghost" class="w-full" size="lg">
                Clear Cart
              </app-button>

              <a
                routerLink="/products"
                class="block text-center mt-4 text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
              >
                ← Continue Shopping
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class Cart {
  private store = inject(Store);

  cartItems = toSignal(this.store.select(cartFeature.selectItems), { initialValue: [] });
  cartTotal = toSignal(this.store.select(cartFeature.selectTotal), { initialValue: 0 });
  cartItemCount = toSignal(this.store.select(cartFeature.selectItemCount), { initialValue: 0 });

  updateQuantity(productId: number, quantity: number) {
    this.store.dispatch(CartActions.updateQuantity({ productId, quantity }));
  }

  removeItem(productId: number) {
    this.store.dispatch(CartActions.removeItem({ productId }));
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }
}
