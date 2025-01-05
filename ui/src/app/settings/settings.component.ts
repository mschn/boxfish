import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TitleComponent } from '../components/title/title.component';
import { setDarkTheme } from '../model/darktheme';
import { getLanguageFromUrl, Language } from '../model/lang.model';
import { SettingsStore } from '../services/settings.store';

@Component({
  selector: 'app-settings',
  imports: [ToggleSwitchModule, FormsModule, SelectModule, TitleComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  settingsStore = inject(SettingsStore);
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

  setDarkMode(darkMode: boolean) {
    setDarkTheme(darkMode);
    this.settingsStore.setDarkMode(darkMode);
  }

  onLangChange(lang: SelectChangeEvent) {
    window.location.pathname = `${lang.value.value}/settings`;
  }
}
