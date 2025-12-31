import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Signal to track dark mode state
  isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Apply theme on initialization
    this.applyTheme(this.isDarkMode());

    // Watch for changes and apply theme
    effect(() => {
      this.applyTheme(this.isDarkMode());
      this.saveTheme(this.isDarkMode());
    });
  }

  /**
   * Get initial theme from localStorage or system preference
   */
  private getInitialTheme(): boolean {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Toggle dark mode
   */
  toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());
  }

  /**
   * Apply theme to document
   */
  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  /**
   * Save theme preference to localStorage
   */
  private saveTheme(isDark: boolean): void {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}
