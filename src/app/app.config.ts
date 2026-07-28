import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { BrowserLanguageService, LanguageService } from './domains/shared/util-common/language.ts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      withHashLocation(),
    ),
    {
      provide: LanguageService,
      useClass: BrowserLanguageService,
    },
  ],
};
