import { Component, computed, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-form-error',
  imports: [],
  template: `
    @if (showErrors()) {
      @for (error of control().errors(); track error.kind) {
        <p class="text-red-500 text-xs animate-fade-in mt-1">
          {{ error.message }}
        </p>
      }
    }
  `,
  styles: [``],
})
export class FormError {
  readonly control = input.required<FieldState<any>>();
  readonly showErrors = computed(() => this.control().touched() && this.control().invalid());
}
