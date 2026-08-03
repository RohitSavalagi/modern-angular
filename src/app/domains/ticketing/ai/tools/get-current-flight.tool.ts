import { inject } from '@angular/core';
import { FlightDetailSignalStore } from '@flight/ticketing/feature-booking/flight-edit/simple-flight-detail-store';
import { createTool } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

export const getCurrentFlight = createTool({
  name: 'getCurrentFlight',
  description: `
    Get the flight currently displayed in the detail view.

    So, when the user refers to "the flight" or "this flight" or "current flight", you can update it with this tool.

    Preconditions:
    - This tool can ONLY be used when the current route is /flight-booking/flight-edit
      Check this precondition before using this tool.
  `,
  schema: s.object('No input parameters', {}),
  handler: () => {
    const store = inject(FlightDetailSignalStore);
    return Promise.resolve(store.flightValue());
  },
});
