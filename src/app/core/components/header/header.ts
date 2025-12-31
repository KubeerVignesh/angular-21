import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { cartFeature } from '../../../shared/cart-store/cart-feature';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header
      class="sticky top-0 z-50 bg-white  dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-xl backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 transition-colors duration-300"
    >
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-8">
            <a
              routerLink="/products"
              class="text-2xl font-bold text-indigo-600 dark:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              🛍️ Products
            </a>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-3">
            <!-- Dark Mode Toggle -->
            <div class="relative group">
              <button
                (click)="toggleTheme()"
                class="p-2 text-gray-700 flex items-center gap-2 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-900"
              >
                @if (isDarkMode()) {
                  <!-- Sun icon for light mode -->
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                } @else {
                  <!-- Moon icon for dark mode -->
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    ></path>
                  </svg>
                }
                <span>{{ isDarkMode() ? 'Light' : 'Dark' }}</span>
              </button>
            </div>

            <!-- Cart Icon with Badge -->
            <button
              routerLink="/cart"
              class="relative flex gap-2 items-center p-2 text-gray-700  hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-900"
              title="Shopping Cart"
              routerLinkActive="text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-slate-900 dark:text-indigo-600 dark:border-indigo-600"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              <span>Cart</span>
              @if (cartItemCount() > 0) {
                <span
                  class="absolute -top-1.5 -right-2 bg-rose-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white "
                >
                  {{ cartItemCount() }}
                </span>
              }
            </button>

            <!-- User Menu - Only show when authenticated -->
            <div class="flex items-center space-x-3">
              <a
                routerLink="/profile"
                routerLinkActive="text-indigo-600  dark:text-indigo-400 bg-gray-100 dark:bg-slate-900 dark:text-indigo-600 dark:border-indigo-600"
                class="px-4 py-2 flex gap-2 items-center p-2 text-gray-700  hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 640 640"
                  class="w-6 h-6"
                >
                  <path
                    d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"
                  />
                </svg>
                Profile
              </a>
              <button
                (click)="logout()"
                class="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors text-sm font-medium shadow-lg shadow-red-900/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
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
export class Header {
  private store = inject(Store);
  private router = inject(Router);
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  // Cart state
  cartItemCount = toSignal(this.store.select(cartFeature.selectItemCount), { initialValue: 0 });

  // Theme state
  isDarkMode = this.themeService.isDarkMode;

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
