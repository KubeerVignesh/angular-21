import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'accent' | 'error' | 'success' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [type]="type()" [disabled]="disabled() || loading()" [class]="buttonClasses()">
      @if (loading()) {
        <span class="flex items-center justify-center">
          <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <ng-content select="[loading]"></ng-content>
        </span>
      } @else {
        <span class="flex items-center justify-center">
          <ng-content></ng-content>
        </span>
      }
    </button>
  `,
})
export class ButtonComponent {
  color = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  class = input<string>('');

  buttonClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none transform transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      primary:
        'bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 focus:ring-blue-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl',
      accent:
        'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 focus:ring-purple-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl',
      error:
        'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 focus:ring-red-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl',
      success:
        'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 focus:ring-green-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl',
      outline:
        'border-2 border-slate-400 text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500 hover:scale-105 active:scale-95 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800',
      ghost:
        'bg-transparent text-slate-600 hover:bg-slate-200 focus:ring-slate-500 hover:scale-105 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',
    };

    return [
      baseClasses,
      sizeClasses[this.size()],
      variantClasses[this.color()],
      this.fullWidth() ? 'w-full' : '',
      this.class(),
    ].join(' ');
  });
}
