import { Injectable } from '@angular/core';
export abstract class LanguageService {
  abstract getUserLang(): string;
}

@Injectable({ providedIn: 'root' })
export class DefaultLanguageService implements LanguageService {
  getUserLang(): string {
    return 'en (default)';
  }
}

@Injectable({ providedIn: 'root' })
export class BrowserLanguageService implements LanguageService {
  getUserLang(): string {
    return navigator.language + ' (browser)';
  }
}
