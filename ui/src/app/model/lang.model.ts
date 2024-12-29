import { Locale } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';

export const Languages = ['en-US', 'fr'] as const;
export type Language = (typeof Languages)[number];

export function getLanguageFromUrl() {
  return (
    Languages.find((l) => window.location.pathname.startsWith(`/${l}`)) ??
    'en-US'
  );
}

export const dateFnsLocales: Record<Language, Locale> = {
  'en-US': enUS,
  fr: fr,
};

export function getDateFnsLocale(): Locale {
  return dateFnsLocales[getLanguageFromUrl()];
}
