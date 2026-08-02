import { Component } from '@angular/core';
import { TabbedPane } from "@flight/shared/ui-common/tabbed-pane/tabbed-pane";
import { Tab } from "@flight/shared/ui-common/tabbed-pane/tab/tab";
import { ClickWithWarning } from "@flight/shared/ui-common/click-with-warning.directive";
import { SimpleTooltipDirective } from "@flight/shared/ui-common/simple-tooltip.directive";
import { TooltipDirective } from "@flight/shared/ui-common/tooltip.directive";

@Component({
  selector: 'app-about',
  imports: [TabbedPane, Tab, ClickWithWarning, SimpleTooltipDirective, TooltipDirective],
  templateUrl: './about.html',
})
export class About {
  deleteAll(): void {
    console.log("Delete all pressed");
  }
}
