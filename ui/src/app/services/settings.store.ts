import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Language } from '../model/lang.model';

export interface SettingsState {
  darkMode: boolean;
  language: Language;
}

const initialState: SettingsState = {
  darkMode: false,
  language: 'en-US',
};

export const SettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setDarkMode(darkMode: boolean): void {
      patchState(store, (state) => ({ ...state, darkMode }));
    },
    setLanguage(language: Language): void {
      patchState(store, (state) => ({ ...state, language }));
    },
  })),
);
