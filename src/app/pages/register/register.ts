import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Field, form, minLength, required, validate } from '@angular/forms/signals';
import { FormError } from '../../shared/form-error';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { authFeature } from '../../shared/auth-store/auth-feature';
import { AuthActions } from '../../shared/auth-store/auth-action';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-register',
  imports: [FormsModule, Field, RouterLink, FormError, ButtonComponent, CommonModule],
  template: `
    <div class=" flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <!-- Card Container with Animation -->
        <div
          class="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] border border-gray-700"
        >
          <!-- Form Section -->
          <div class="px-8 py-8">
            <form (ngSubmit)="onSubmit($event)" class="space-y-6">
              <!-- Username Input -->
              <div class="space-y-2">
                <label for="username" class="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="username"
                    type="text"
                    [field]="registerForm.username"
                    placeholder="Enter your username"
                    class="block w-full pl-10 pr-3 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none placeholder-gray-400"
                    [ngClass]="{
                      '!border-red-500':
                        registerForm.username().invalid() && registerForm.username().touched(),
                    }"
                    [class.animate-shake]="
                      registerForm.username().invalid() && registerForm.username().touched()
                    "
                  />
                </div>
                @if (registerForm?.username()?.invalid() && registerForm?.username()?.touched()) {
                  <app-form-error [control]="registerForm.username()" />
                }
              </div>

              <!-- Email/Phone Input -->
              <div class="space-y-2">
                <label for="emailOrPhone" class="block text-sm font-medium text-gray-300">
                  Phone Number or Email
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    id="emailOrPhone"
                    type="text"
                    [field]="registerForm.emailOrPhone"
                    placeholder="Enter your email or phone"
                    class="block w-full pl-10 pr-3 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none placeholder-gray-400"
                    [ngClass]="{
                      '!border-red-500':
                        registerForm.emailOrPhone().invalid() &&
                        registerForm.emailOrPhone().touched(),
                    }"
                    [class.animate-shake]="
                      registerForm.emailOrPhone().invalid() && registerForm.emailOrPhone().touched()
                    "
                  />
                </div>
                @if (
                  registerForm.emailOrPhone()?.invalid() && registerForm.emailOrPhone()?.touched()
                ) {
                  <app-form-error [control]="registerForm.emailOrPhone()" />
                }
              </div>

              <!-- Password Input -->
              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    [type]="showPassword() ? 'text' : 'password'"
                    [field]="registerForm.password"
                    placeholder="Enter your password"
                    class="block w-full pl-10 pr-10 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none placeholder-gray-400"
                    [ngClass]="{
                      '!border-red-500':
                        registerForm.password().invalid() && registerForm.password().touched(),
                    }"
                    [class.animate-shake]="
                      registerForm.password().invalid() && registerForm.password().touched()
                    "
                  />
                  <button
                    type="button"
                    (click)="showPassword.set(!showPassword())"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    @if (!showPassword()) {
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    } @else {
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    }
                  </button>
                </div>
                @if (registerForm.password()?.invalid() && registerForm.password()?.touched()) {
                  <app-form-error [control]="registerForm.password()" />
                }
              </div>

              <!-- Confirm Password Input -->
              <div class="space-y-2">
                <label for="confirmPassword" class="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    [type]="showConfirmPassword() ? 'text' : 'password'"
                    [field]="registerForm.confirmPassword"
                    placeholder="Confirm your password"
                    class="block w-full pl-10 pr-10 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none placeholder-gray-400"
                    [ngClass]="{
                      '!border-red-500':
                        registerForm.confirmPassword().invalid() &&
                        registerForm.confirmPassword().touched(),
                    }"
                    [class.animate-shake]="
                      registerForm.confirmPassword().invalid() &&
                      registerForm.confirmPassword().touched()
                    "
                  />
                  <button
                    type="button"
                    (click)="showConfirmPassword.set(!showConfirmPassword())"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    @if (!showConfirmPassword()) {
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    } @else {
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    }
                  </button>
                </div>
                @if (
                  registerForm.confirmPassword()?.invalid() &&
                  registerForm.confirmPassword()?.touched()
                ) {
                  <app-form-error [control]="registerForm.confirmPassword()" />
                }
              </div>

              <!-- Error Message -->
              @if (errorMessage()) {
                <div
                  class="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg animate-fade-in"
                >
                  <p class="text-sm">{{ errorMessage() }}</p>
                </div>
              }

              <!-- Register Button -->
              <app-button
                [loading]="isLoading()"
                [disabled]="registerForm().invalid()"
                type="submit"
                variant="primary"
                [fullWidth]="true"
              >
                Register
                <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </app-button>
            </form>

            <!-- Login Link -->
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-400">
                Already have an account?
                <a
                  routerLink="/login"
                  class="ml-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200 
                          underline decoration-2 underline-offset-2 hover:decoration-indigo-300"
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {
    class:
      'flex justify-center items-center min-h-screen p-4 bg-linear-to-br from-slate-800 to-gray-900',
  },
  styles: [
    `
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }
        10%,
        30%,
        50%,
        70%,
        90% {
          transform: translateX(-5px);
        }
        20%,
        40%,
        60%,
        80% {
          transform: translateX(5px);
        }
      }

      .animate-fade-in {
        animation: fade-in 0.5s ease-out;
      }

      .animate-shake {
        animation: shake 0.5s ease-in-out;
      }
    `,
  ],
})
export class Register {
  private store = inject(Store);

  registerModel = signal({
    username: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, (root) => {
    required(root.username, { message: 'User Name is Required' });
    minLength(root.username, 3, { message: 'User Name must be at least 3 characters' });
    required(root.emailOrPhone, { message: 'Email or Phone is Required' });
    required(root.confirmPassword, { message: 'Confirm Password is Required' });
    required(root.password, { message: 'Password is Required' });

    validate(root.emailOrPhone, ({ value }) => {
      // Email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Phone regex (supports various formats)
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

      if (emailRegex.test(value()) || phoneRegex.test(value())) {
        return null;
      }

      if (!value()) {
        return null;
      }
      return {
        kind: 'invalidEmailOrPhone',
        message: 'invalid email or phone number',
      };
    });

    validate(root.confirmPassword, ({ value, valueOf }) => {
      if (!value() || !valueOf(root.password)) return null;
      else if (value() !== valueOf(root.password)) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }

      return null;
    });
  });
  // Select auth state from store
  authError = toSignal(this.store.select(authFeature.selectError), { initialValue: null });
  authLoading = toSignal(this.store.select(authFeature.selectLoading), { initialValue: false });

  // Sync store state with local signals
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  showPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor() {
    // Sync store error state with local error message signal
    effect(() => {
      const error = this.authError();
      this.errorMessage.set(error);
    });

    // Sync store loading state with local loading signal
    effect(() => {
      const loading = this.authLoading();
      this.isLoading.set(loading);
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage.set(null);

    if (this.registerForm().valid()) {
      const formValue = this.registerForm().value();
      const payload = {
        name: formValue.username,
        email: formValue.emailOrPhone,
        password: formValue.password,
      };
      this.store.dispatch(AuthActions.register(payload));
    }
  }
}
