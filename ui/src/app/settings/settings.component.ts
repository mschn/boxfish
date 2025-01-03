import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { getLanguageFromUrl, Language } from '../model/lang.model';
import { TitleComponent } from '../components/title/title.component';

@Component({
  selector: 'app-settings',
  imports: [ToggleSwitchModule, FormsModule, SelectModule, TitleComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  darkTheme = signal(false);

  lang = signal<Language>(getLanguageFromUrl());
  selectedLang = computed(() =>
    this.langOptions.find((l) => l.value === this.lang()),
  );
  langOptions: { name: string; value: Language }[] = [
    {
      name: $localize`English`,
      value: 'en-US',
    },
    {
      name: $localize`French`,
      value: 'fr',
    },
  ];

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

  onLangChange(lang: SelectChangeEvent) {
    window.location.pathname = `${lang.value.value}/settings`;
  }
}
