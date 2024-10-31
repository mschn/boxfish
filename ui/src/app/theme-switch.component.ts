import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-theme-toggle',
  template: ` <p-toggleswitch
    inputId="darktheme-switch"
    styleClass="darkThemeSwitch"
    [ngModel]="darkTheme()"
    (ngModelChange)="toggleDayNight()"
    [dt]="darkThemeSwitchTokens"
  />`,
  standalone: true,
  imports: [ToggleSwitchModule, FormsModule],
})
export class ThemeToggleComponent {
  #document = inject(DOCUMENT);
  darkTheme = signal(false);

  darkThemeSwitchTokens = {
    width: '4.2rem',
    height: '2.3rem',
    checkedBackground: '#ccc',
    checkedHoverBackground: '#ddd',
    handle: {
      size: '2rem',
      background: 'transparent url("sun-emoji.png") 0 0 / 2rem no-repeat',
      hoverBackground: 'transparent url("sun-emoji.png") 0 0 / 2rem no-repeat',
      checkedBackground:
        'transparent url("moon-emoji.png") 0 0 / 2rem no-repeat',
      checkedHoverBackground:
        'transparent url("moon-emoji.png") 0 0 / 2rem no-repeat',
    },
  };

  constructor() {
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
