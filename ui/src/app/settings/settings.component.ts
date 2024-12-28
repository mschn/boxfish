import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-settings',
  imports: [ToggleSwitchModule, FormsModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  darkTheme = signal(false);

  constructor() {
    if (this.isDarkTheme()) {
      this.setDarkMode(true);
    }
  }

  setDarkMode(darkMode: boolean) {
    const element = document.querySelector('html');
    element?.classList[darkMode ? 'add' : 'remove']('dark');
    this.darkTheme.set(darkMode);
  }

  isDarkTheme(): boolean {
    const hasDarkClass =
      document.querySelector('html')?.classList.contains('dark') ?? false;
    return (
      window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ||
      hasDarkClass
    );
  }
}
