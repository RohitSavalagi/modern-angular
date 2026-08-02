import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TabbedPane } from '../tabbed-pane';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab {
  private _pane?: TabbedPane;
  readonly title = input.required<string>();

  protected readonly visible = computed(() => {
    return this._pane?.currentTab() === this;
  });

  set pane(pane: TabbedPane) {
    this._pane = pane;
  }
}
