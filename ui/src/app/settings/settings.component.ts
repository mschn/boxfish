import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TitleComponent } from '../components/title/title.component';
import { getLanguageFromUrl, Language } from '../model/lang.model';
import { isDarkTheme, setDarkTheme } from '../model/darktheme';

@Component({
  selector: 'app-settings',
  imports: [ToggleSwitchModule, FormsModule, SelectModule, TitleComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  darkTheme = signal(isDarkTheme());

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
    this.darkTheme.set(darkMode);
  }

  onLangChange(lang: SelectChangeEvent) {
    window.location.pathname = `${lang.value.value}/settings`;
  }
}
