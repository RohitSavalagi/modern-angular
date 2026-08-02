import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, inject, model, signal } from '@angular/core';
import { Tab } from './tab/tab';

@Component({
  selector: 'app-tabbed-pane',
  templateUrl: './tabbed-pane.html',
  styles: `
    .pane {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
      padding: 25px;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
    }

    .tabs-header {
      display: flex;
      gap: 8px;
      border-bottom: 1px solid #e0e0e0;
    }

    .tab-button {
      padding: 10px 20px;
      border: none;
      border-radius: 0;
      background: transparent;
      color: #666;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s ease;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
    }

    .tab-button:hover {
      color: #333;
    }

    .tab-button.active {
      color: #1976d2;
      border-bottom: 2px solid #1976d2;
      border-radius: 0;
    }

    .tabs-content {
      padding: 20px;
      background-color: #fff;
      margin-top: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabbedPane {
  protected readonly tabs = contentChildren(Tab);
  protected readonly current = model(0);

  readonly currentTab = computed(() => this.tabs()[this.current()]);


  constructor() {
    effect(() => {
      for (const tab of this.tabs()) {
        tab.pane = this;
      }
    })
  }

  activate(tabIndex: number): void {
    this.current.set(tabIndex);
  }
}
