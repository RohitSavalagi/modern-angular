import { Component, inject, signal } from '@angular/core';
import { Navbar } from './shell/navbar/navbar';
import { Sidebar } from './shell/sidebar/sidebar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AssistantChat } from '@flight/shared/ui-assistant/assistant-chat/assistant-chat';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Navbar, Sidebar, RouterOutlet, AssistantChat],
})
export class App {
  protected readonly title = signal('Flights');
  private readonly router = inject(Router);

  protected readonly isLoading = signal(false);
  constructor() {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        console.log('event');
        this.isLoading.set(true);
      } else if (
        events instanceof NavigationEnd ||
        events instanceof NavigationError ||
        events instanceof NavigationCancel
      ) {
        this.isLoading.set(false);
      }
    });
  }

  protected updateTitle(): void {
    this.title.set('high end flight');
    console.log('title updated', this.title());
  }
}
