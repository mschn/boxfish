import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import {
  provideTanStackQuery,
  QueryClient,
  withDevtools,
} from '@tanstack/angular-query-experimental';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { authInterceptor } from './services/auth';
import { PrimePreset } from './model/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    providePrimeNG({
      theme: {
        preset: PrimePreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
          },
        },
      }),
      withDevtools(),
    ),
  ],
};
