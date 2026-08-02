import { Component, signal } from '@angular/core';
import { TabbedPane } from '@flight/shared/ui-common/tabbed-pane/tabbed-pane';
import { Tab } from '@flight/shared/ui-common/tabbed-pane/tab/tab';
import { ClickWithWarning } from '@flight/shared/ui-common/click-with-warning.directive';
import { SimpleTooltipDirective } from '@flight/shared/ui-common/simple-tooltip.directive';
import { TooltipDirective } from '@flight/shared/ui-common/tooltip.directive';
import { DataTable } from '@flight/shared/ui-common/data-table/data-table';
import { TableField } from '@flight/shared/ui-common/data-table/table-field';
import { Flight } from '@flight/ticketing/data/flight';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [
    TabbedPane,
    Tab,
    ClickWithWarning,
    SimpleTooltipDirective,
    TooltipDirective,
    DataTable,
    TableField,
    DatePipe
  ],
  templateUrl: './about.html',
})
export class About {
  deleteAll(): void {
    console.log('Delete all pressed');
  }

  protected readonly flights = signal<Flight[]>([
    {
      id: 1,
      from: 'Hamburg',
      to: 'Berlin',
      date: '2025-02-01T17:00+01:00',
      delayed: false,
      delay: 0,
      aircraft: { type: 'A320', registration: 'D-AIUA' },
      prices: [],
    },
    {
      id: 2,
      from: 'Hamburg',
      to: 'Frankfurt',
      date: '2025-02-01T17:30+01:00',
      delayed: false,
      delay: 0,
      aircraft: { type: 'B737', registration: 'D-ABKA' },
      prices: [],
    },
    {
      id: 3,
      from: 'Hamburg',
      to: 'Mallorca',
      date: '2025-02-01T17:45+01:00',
      delayed: false,
      delay: 0,
      aircraft: { type: 'A321', registration: 'D-AISN' },
      prices: [],
    },
  ]);
}
