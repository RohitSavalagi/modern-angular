import { inject } from '@angular/core';
import { FlightSignalStore } from '@flight/ticketing/feature-booking/flight-search/flight-store';
import { createTool } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

export const getLoadedFlights = createTool({
  name: 'getLoadedFlights',
  description: `
    Returns the currently loaded/ displayed flights.

    Remarks:
    - This tool is NOT displaying the list with these flights to the user
    - This list is useful to answer questions about the current working set
    - Use this tool when the user is asking for flights in general but not when they are asking for
      "booked flights", "tickets" or when they ask for checking in to a flight
    - The returned flights are **not** booked.
      If displayed with the flightWidget, use status: 'other' (!)
  `,
  schema: s.object('No input parameters', {}),
  handler: () => {
    const store = inject(FlightSignalStore);
    console.log('getLoadedFlights', store.flightsValue());

    return Promise.resolve(store.flightsValue());
  },
});
