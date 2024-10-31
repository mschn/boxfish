import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Lara } from 'primeng/themes/lara';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, ButtonModule, InputSwitchModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  #document = inject(DOCUMENT);
  primeNgConfig = inject(PrimeNGConfig);
  darkTheme = signal(false);

  routes = [
    {
      name: 'Containers',
      link: '/containers',
      icon: 'pi-box',
    },
    {
      name: 'Images',
      link: '/images',
      icon: 'pi-images',
    },
    {
      name: 'Volumes',
      link: '/volumes',
      icon: 'pi-database',
    },
  ];

  constructor() {
    this.primeNgConfig.theme.set({
      preset: Lara,
      options: {
        darkModeSelector: '.dark',
      },
    });

    if (this.isDarkTheme()) {
      this.toggleDayNight();
    }
  }

  toggleDayNight() {
    const element = this.#document.querySelector('html');
    element?.classList.toggle('dark');
    this.darkTheme.set(!this.darkTheme());
  }

  isDarkTheme(): boolean {
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches;
  }
}
