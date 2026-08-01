import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { BrowserLanguageService, LanguageService } from './domains/shared/util-common/language';
import { provideSignalFormsConfig } from '@angular/forms/signals';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSignalFormsConfig({
      classes: {
        'ng-invalid': (field) => field.state().invalid(),
        'ng-valid': (field) => field.state().valid(),
        'ng-dirty': (field) => field.state().dirty(),
        'ng-pristine': (field) => !field.state().dirty(),
        'ng-pending': (field) => field.state().pending(),
      },
    }),
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
