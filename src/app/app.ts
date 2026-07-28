import { Component, signal } from '@angular/core';
import { Navbar } from './shell/navbar/navbar';
import { Sidebar } from './shell/sidebar/sidebar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    Navbar,
    Sidebar
  ]
})
export class App {
  protected readonly title = signal('Flights');

  protected updateTitle(): void {
    this.title.set("high end flight");
    console.log("title updated", this.title());
  }
}
