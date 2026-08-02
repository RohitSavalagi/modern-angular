import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
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
import { ConfigService } from '@flight/shared/util-common/config-service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@flight/shared/util-auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => inject(ConfigService).load()),
    provideHttpClient(withInterceptors([authInterceptor])),
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
