import { Component, ElementRef, inject, signal, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/user.model';
import { Field, form, required, validate } from '@angular/forms/signals';
import { FormError } from '../../shared/form-error';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

// Shared Components
import { ButtonComponent } from '../../shared/components/button/button.component';

// ng-select
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    NgSelectModule,
    ButtonComponent,
    Field,
    FormError,
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    <div class="container mx-auto px-4 py-4 max-w-5xl">
      @if (user(); as currentUser) {
        <div
          class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700"
        >
          <!-- Header/Cover with Gradient -->
          <div class="h-48 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            <div class="absolute -bottom-16 left-8">
              <div class="relative">
                <div
                  class="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-white shadow-lg"
                >
                  <img
                    [src]="
                      currentUser.image ||
                      'https://api.dicebear.com/7.x/avataaars/svg?seed=' + currentUser.name
                    "
                    [alt]="currentUser.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  class="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white dark:border-slate-800"
                ></div>
              </div>
            </div>
          </div>

          <!-- Profile Content -->
          <div class="pt-20 px-8 pb-8">
            <!-- Name and Role -->
            <div class="mb-8">
              <div class="flex items-center justify-between mb-2">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ currentUser.name }}
                </h1>
                <app-button color="primary" (click)="openEditModal()" class="rounded-xl!">
                  Edit Profile
                </app-button>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium capitalize"
                >
                  {{ currentUser.role }}
                </span>
                <span class="text-gray-500 dark:text-gray-400 text-sm">Member since 2024</span>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              @for (item of profileItems; track item.label) {
                <div
                  class="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors group"
                  [class.md:col-span-2]="item.fullWidth"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="p-3 rounded-lg group-hover:scale-110 transition-transform"
                      [ngClass]="item.colorClasses"
                    >
                      <mat-icon>{{ item.icon }}</mat-icon>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {{ item.label }}
                      </div>
                      <div class="text-gray-900 dark:text-white font-semibold">
                        {{ item.value || 'Not provided' }}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Edit Modal Overlay -->
        @if (isEditModalOpen()) {
          <div class="fixed inset-0 z-100 flex items-center justify-center p-4">
            <!-- Modal Backdrop -->
            <div
              class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
              (click)="closeEditModal()"
            ></div>

            <!-- Modal Content (Using dialog tag for semantic clarity) -->
            <dialog
              [open]="isEditModalOpen()"
              class="relative border-none p-0 bg-white dark:bg-slate-800 rounded-2xl py-4 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] w-full max-w-4xl z-10 animate-in fade-in zoom-in duration-200"
            >
              <h2 class="text-2xl border-b border-gray-900 font-bold pb-4 px-8 dark:text-white">
                Edit Profile
              </h2>

              <!-- Scrollable Content -->
              <div class="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <!-- First Name -->
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>First Name</mat-label>
                    <input matInput [field]="profileForm.firstName" />
                    @if (profileForm.firstName().invalid() && profileForm.firstName().touched()) {
                      <mat-error>First name is required</mat-error>
                    }
                  </mat-form-field>

                  <!-- Last Name -->
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Last Name</mat-label>
                    <input matInput [field]="profileForm.lastName" />
                    @if (profileForm.lastName().invalid() && profileForm.lastName().touched()) {
                      <mat-error>Last name is required</mat-error>
                    }
                  </mat-form-field>

                  <!-- Email -->
                  <mat-form-field appearance="outline" class="w-full md:col-span-2">
                    <mat-label>Email Address</mat-label>
                    <input matInput type="email" [field]="profileForm.email" />
                    @if (profileForm.email().invalid() && profileForm.email().touched()) {
                      <app-form-error [control]="profileForm.email()" />
                    }
                  </mat-form-field>

                  <!-- Phone Section -->
                  <div class="w-full">
                    <ng-select
                      [items]="countryCodes"
                      bindLabel="name"
                      bindValue="value"
                      [field]="profileForm.countryCode"
                      placeholder="Select Code"
                      class="custom-ng-select"
                      [searchable]="false"
                      [clearable]="false"
                    >
                    </ng-select>
                  </div>
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Phone Number</mat-label>
                    <input matInput type="tel" [field]="profileForm.phone" />
                    @if (profileForm.phone().invalid() && profileForm.phone().touched()) {
                      <app-form-error [control]="profileForm.phone()" />
                    }
                  </mat-form-field>

                  <!-- Date of Birth -->
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Date of Birth</mat-label>
                    <input
                      matInput
                      [matDatepicker]="picker"
                      [field]="profileForm.dobDate"
                      (dateChange)="onDateChange($event)"
                    />
                    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>

                  <!-- Gender -->
                  <div class="w-full">
                    <ng-select
                      [items]="genders"
                      [field]="profileForm.gender"
                      placeholder="Select Gender"
                      class="custom-ng-select"
                      [searchable]="false"
                      [clearable]="false"
                    >
                    </ng-select>
                  </div>

                  <!-- Detailed Address -->
                  <div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <mat-form-field appearance="outline" class="md:col-span-2">
                      <mat-label>Street Address</mat-label>
                      <textarea matInput [field]="profileForm.streetAddress" rows="2"></textarea>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>City</mat-label>
                      <input matInput [field]="profileForm.city" />
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>State / Province</mat-label>
                      <input matInput [field]="profileForm.state" />
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>PIN / Zip Code</mat-label>
                      <input matInput [field]="profileForm.pinCode" />
                    </mat-form-field>
                  </div>

                  <!-- Image Upload -->
                  <div class="md:col-span-2 mt-2">
                    <label class="block text-xs font-medium text-gray-500 mb-2 ml-1"
                      >Profile Picture</label
                    >
                    <div
                      class="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/20"
                    >
                      <img
                        [src]="
                          profileModel().image ||
                          'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user().name
                        "
                        class="w-16 h-16 rounded-xl object-cover shadow-md"
                      />
                      <div class="flex-1">
                        <input
                          type="file"
                          (change)="onFileSelected($event)"
                          accept="image/*"
                          id="fileUpload"
                          class="hidden"
                        />
                        <label
                          for="fileUpload"
                          class="cursor-pointer inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <mat-icon class="mr-2!">cloud_upload</mat-icon>
                          Choose New File
                        </label>
                        <p class="mt-2 text-[10px] text-gray-400 uppercase tracking-wider">
                          JPG, PNG or SVG (Max 2MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer Buttons -->
              <footer class="border-t border-gray-900 pt-4 flex gap-3 px-2 justify-end">
                <app-button
                  color="outline"
                  (click)="closeEditModal()"
                  class="rounded-xl! min-w-[120px]"
                >
                  Cancel
                </app-button>
                <app-button
                  color="accent"
                  (click)="saveProfile()"
                  [disabled]="profileForm().invalid()"
                  class="rounded-xl! min-w-[150px]"
                >
                  Save Profile
                </app-button>
              </footer>
            </dialog>
          </div>
        }
      } @else {
        <div class="flex justify-center text-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class Profile {
  private authService = inject(AuthService);

  user = signal<User>(JSON.parse(localStorage.getItem('user') || '{}'));
  isEditModalOpen = signal(false);

  profileModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '',
    gender: '',
    streetAddress: '',
    city: '',
    state: '',
    pinCode: '',
    dobDate: null as Date | null,
    dob: '',
    image: '',
  });

  profileForm = form(this.profileModel, (root) => {
    required(root.firstName, { message: 'First name is required' });
    required(root.lastName, { message: 'Last name is required' });
    validate(root.email, ({ value }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value()) return { kind: 'required', message: 'Email is required' };
      if (!emailRegex.test(value())) return { kind: 'invalidEmail', message: 'Invalid email' };
      return null;
    });

    validate(root.phone, ({ value, valueOf }) => {
      if (!value()) return null; // Phone is optional

      const country = valueOf(root.countryCode);
      const phoneNum = value().replace(/\D/g, '');

      const rules: Record<string, { len: number | number[]; label: string }> = {
        '+1': { len: 10, label: '10 digits for US' },
        '+44': { len: 10, label: '10 digits for UK' },
        '+91': { len: 10, label: '10 digits for India' },
        '+61': { len: 9, label: '9 digits for Australia' },
        '+81': { len: 10, label: '10 digits for Japan' },
        '+49': { len: [10, 11], label: '10-11 digits for Germany' },
      };

      const rule = rules[country || ''];
      if (rule) {
        const isValid = Array.isArray(rule.len)
          ? rule.len.includes(phoneNum.length)
          : phoneNum.length === rule.len;

        if (!isValid) {
          return { kind: 'invalidPhone', message: `Expected ${rule.label}` };
        }
      }
      return null;
    });
  });

  countryCodes = [
    { name: '+1 (US)', value: '+1' },
    { name: '+44 (UK)', value: '+44' },
    { name: '+91 (IN)', value: '+91' },
    { name: '+61 (AU)', value: '+61' },
    { name: '+81 (JP)', value: '+81' },
    { name: '+49 (DE)', value: '+49' },
  ];

  genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'];

  get profileItems() {
    const u = this.user();
    const fullAddress =
      [u.streetAddress, u.city, u.state, u.pinCode].filter(Boolean).join(', ') || u.address;

    return [
      {
        label: 'First Name',
        value: u.firstName,
        icon: 'person',
        colorClasses: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
      },
      {
        label: 'Last Name',
        value: u.lastName,
        icon: 'person',
        colorClasses: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
      },
      {
        label: 'Gender Identity',
        value: u.gender,
        icon: 'wc',
        colorClasses: 'bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400',
      },
      {
        label: 'Date of Birth',
        value: u.dob,
        icon: 'cake',
        colorClasses: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
      },
      {
        label: 'Email Address',
        value: u.email,
        icon: 'email',
        colorClasses: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400',
      },
      {
        label: 'Phone Number',
        value: (u.countryCode ? u.countryCode + ' ' : '') + (u.phone || ''),
        icon: 'phone',
        colorClasses:
          'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400',
      },
      {
        label: 'Address',
        value: fullAddress,
        icon: 'location_on',
        colorClasses: 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400',
        fullWidth: true,
      },
    ];
  }

  openEditModal() {
    const u = this.user();
    let dobDate: Date | null = null;
    if (u.dob) {
      const [day, month, year] = u?.dob?.split('/').map(Number);
      dobDate = new Date(year, month - 1, day);
    }

    this.profileModel.set({
      firstName: u.firstName || '',
      lastName: u.lastName || '',
      email: u.email || '',
      phone: u.phone || '',
      countryCode: u.countryCode || '',
      gender: u.gender || '',
      streetAddress: u.streetAddress || '',
      city: u.city || '',
      state: u.state || '',
      pinCode: u.pinCode || '',
      dob: u.dob || '',
      dobDate: dobDate,
      image: u.image || '',
    });
    this.isEditModalOpen.set(true);
  }

  closeEditModal() {
    this.isEditModalOpen.set(false);
  }

  onDateChange(event: any) {
    if (event.value) {
      const dateStr = event.value.toLocaleDateString();
      this.profileModel.update((prev) => ({
        ...prev,
        dob: dateStr,
        dobDate: event.value,
      }));
    }
  }

  saveProfile() {
    if (this.profileForm().valid()) {
      const formValue = this.profileForm().value();
      const updatedUser: User = {
        ...formValue,
        image: this.profileModel().image,
        dob: this.profileModel().dob,
      } as any;

      if (updatedUser.firstName || updatedUser.lastName) {
        updatedUser.name = `${updatedUser.firstName || ''} ${updatedUser.lastName || ''}`.trim();
      }

      updatedUser.address = [
        updatedUser.streetAddress,
        updatedUser.city,
        updatedUser.state,
        updatedUser.pinCode,
      ]
        .filter(Boolean)
        .join(', ');
      const user = {
        ...updatedUser,
        id: this.user().id,
      };
      this.authService.updateProfile(user).subscribe({
        next: (response) => {
          if (response.success && response.data && response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.user.set(response.data.user);
            this.closeEditModal();
          }
        },
        error: (err) => {
          console.error('Failed to update profile', err);
          alert('Failed to update profile. Please try again.');
        },
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileModel.update((prev) => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }
}
