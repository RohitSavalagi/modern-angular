import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TabInfo, TabRegistry } from '../../service-tabbed-pane/tab-registry';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab implements TabInfo {
  private registry = inject(TabRegistry);
  readonly title = input.required<string>();

  protected readonly visible = computed(() => {
    return this.registry?.currentTab() === this;
  });

  constructor() {
    this.registry.registerTab(this);
  }
}
