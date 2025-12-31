import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../core/components/header/header';
import { Footer } from '../core/components/footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <div class="flex flex-col h-screen overflow-hidden transition-colors duration-300">
      <app-header />
      <main class="flex-1 overflow-y-auto bg-white dark:bg-slate-800 px-4 py-8">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        min-height: 100vh;
      }
    `,
  ],
})
export class MainLayout {}
