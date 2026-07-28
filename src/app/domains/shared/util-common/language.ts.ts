import { Service } from '@angular/core';
export abstract class LanguageService {
  abstract getUserLang(): string;
}

@Service({ autoProvided: false })
export class DefaultLanguageService implements LanguageService {
  getUserLang(): string {
    return 'en (default)';
  }
}

@Service({ autoProvided: false })
export class BrowserLanguageService implements LanguageService {
  getUserLang(): string {
    return navigator.language + ' (browser)';
  }
}
