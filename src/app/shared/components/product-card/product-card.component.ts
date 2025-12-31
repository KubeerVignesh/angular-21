import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { product } from '../../../pages/products/store/product.model';
import { ButtonComponent } from '../button/button.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ButtonComponent, CurrencyPipe],
  template: `
    <div
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <!-- Skeleton Loader -->
      @if (isLoading()) {
        <div class="animate-pulse flex flex-col h-full">
          <div class="h-48 bg-gray-200 dark:bg-gray-700 w-full"></div>
          <div class="p-4  flex flex-col space-y-3">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            <div class=""></div>
            <div class="flex justify-between items-center mt-4">
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      } @else {
        <div
          class="relative h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center"
        >
          <img
            [src]="product()?.imageUrl || 'https://placehold.co/400x300?text=No+Image'"
            [alt]="product()?.name"
            class="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            (error)="handleImageError($event)"
          />
        </div>

        <div class="p-4 flex-grow flex flex-col">
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1"
            [title]="product()?.name"
          >
            {{ product()?.name }}
          </h3>

          <p
            class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2"
            [title]="product()?.description"
          >
            {{ product()?.description }}
          </p>

          <div class="flex-grow"></div>

          <div class="flex justify-between items-center mt-4">
            <span class="text-xl font-bold text-gray-900 dark:text-white">
              {{ product()?.price | currency }}
            </span>
            <app-button
              (click)="onAddToCart($event)"
              color="primary"
              size="lg"
              class="px-4 py-2  text-sm font-medium"
            >
              Add to Cart
            </app-button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [],
})
export class ProductCardComponent {
  product = input<product>();
  isLoading = input<boolean>(false);
  addToCart = output<product | undefined>();

  handleImageError(event: any) {
    event.target.src = 'https://placehold.co/400x300?text=No+Image';
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    if (this.product()) {
      this.addToCart.emit(this.product());
    }
  }
}
