import { Component } from '@angular/core';
import { TabbedPane } from "@flight/shared/ui-common/tabbed-pane/tabbed-pane";
import { Tab } from "@flight/shared/ui-common/tabbed-pane/tab/tab";

@Component({
  selector: 'app-about',
  imports: [TabbedPane, Tab],
  templateUrl: './about.html',
})
export class About {}
