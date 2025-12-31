import { Component, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Field, form, required, validate } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { FormError } from '../../shared/form-error';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../shared/auth-store/auth-action';
import { authFeature } from '../../shared/auth-store/auth-feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Field, FormsModule, FormError, ButtonComponent, CommonModule],
  template: `
    <div class=" flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <!-- Card Container with Animation -->
        <div
          class="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] border border-gray-700"
        >
          <!-- Form Section -->
          <div class="px-8 py-10">
            <form (ngSubmit)="onSubmit($event)" class="space-y-6">
              <!-- Email/Phone Input -->
              <div class="space-y-2">
                <label for="emailOrPhone" class="block text-sm font-medium text-gray-300">
                  Email or Phone Number
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
                    id="emailOrPhone"
                    type="text"
                    [field]="loginForm.emailOrPhone"
                    placeholder="Enter your email or phone"
                    class="block w-full pl-10 pr-3 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none placeholder-gray-400"
                    [ngClass]="{
                      '!border-red-500':
                        loginForm.emailOrPhone().invalid() && loginForm.emailOrPhone().touched(),
                    }"
                    [class.animate-shake]="
                      loginForm.emailOrPhone().invalid() && loginForm.emailOrPhone().touched()
                    "
                  />
                </div>
                @if (loginForm.emailOrPhone()?.invalid() && loginForm.emailOrPhone()?.touched()) {
                  <app-form-error [control]="loginForm.emailOrPhone()" />
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
                    [field]="loginForm.password"
                    placeholder="Enter your password"
                    class="block w-full pl-10 pr-10 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none placeholder-gray-400"
                    [ngClass]="{
                      '!border-red-500':
                        loginForm.password().invalid() && loginForm.password().touched(),
                    }"
                    [class.animate-shake]="
                      loginForm.password().invalid() && loginForm.password().touched()
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
                @if (loginForm.password()?.invalid() && loginForm.password()?.touched()) {
                  <app-form-error [control]="loginForm.password()" />
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
              <!-- Sign In Button -->
              <app-button
                [loading]="isLoading()"
                [disabled]="loginForm().invalid()"
                type="submit"
                variant="primary"
                [fullWidth]="true"
              >
                Sign In
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

            <!-- Register Link -->
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-400">
                Don't have an account?
                <a
                  routerLink="/register"
                  class="ml-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200 
                          underline decoration-2 underline-offset-2 hover:decoration-indigo-300"
                >
                  Register here
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
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  // Select auth state from store
  authError = toSignal(this.store.select(authFeature.selectError), { initialValue: null });
  authLoading = toSignal(this.store.select(authFeature.selectLoading), { initialValue: false });

  // Sync store state with local signals
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  loginModel = signal({
    emailOrPhone: '',
    password: '',
  });

  loginForm = form(this.loginModel, (root) => {
    required(root.password, { message: 'Password is required' });
    validate(root.emailOrPhone, ({ value }) => {
      // Email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Phone regex (supports various formats)
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

      if (emailRegex.test(value()) || phoneRegex.test(value())) {
        return null;
      }

      if (!value()) {
        return {
          kind: 'required',
          message: 'Email or phone is required',
        };
      }

      return {
        kind: 'invalidEmailOrPhone',
        message: 'invalid email or phone number',
      };
    });
  });
  showPassword = signal(false);

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

    if (this.loginForm().valid()) {
      const formValue = this.loginForm().value();
      // Extract email from emailOrPhone (backend expects email)
      // For now, assuming user enters email. If phone, you'd need to convert it
      const email = formValue.emailOrPhone || '';

      const loginData = {
        email: email,
        password: formValue.password || '',
      };

      this.store.dispatch(AuthActions.login(loginData));
    } else {
      // Mark form as touched to show validation errors
      console.log('Login form is invalid');
    }
  }
}
