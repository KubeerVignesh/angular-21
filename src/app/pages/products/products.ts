import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { select, Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { productActions } from './store/product.action';
import { productFeature } from './store/product.feature';
import { product } from './store/product.model';
import { CartActions } from '../../shared/cart-store/cart-action';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <main class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Our Products</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @if (loading()) {
          @for (item of [1, 2, 3, 4, 5, 6, 7, 8]; track item) {
            <app-product-card [isLoading]="true"></app-product-card>
          }
        } @else {
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" (addToCart)="handleAddToCart($event)">
            </app-product-card>
          }
        }
      </div>
    </main>
  `,
  styles: [``],
})
export class Products {
  store = inject(Store);
  products = toSignal(this.store.pipe(select(productFeature.selectProducts)), { initialValue: [] });
  loading = toSignal(this.store.pipe(select(productFeature.selectLoading)), {
    initialValue: false,
  });

  constructor() {
    this.store.dispatch(productActions.getProducts());
  }

  handleAddToCart(product: product | undefined) {
    if (product) {
      this.store.dispatch(CartActions.addItem({ product, quantity: 1 }));
    }
  }
}
