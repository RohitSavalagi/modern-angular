import { inject } from '@angular/core';
import { createTool } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

import { FlightSignalStore } from '../../feature-booking/flight-search/flight-store';

export const getCurrentBasket = createTool({
  name: 'getCurrentBasket',
  description: `
    Returns all selected flights (flights in the basket) as an object
    mapping flightIds to a boolean (true: selected, false: deselected)
  `,
  schema: s.object('No input parameters', {}),
  handler: () => {
    const store = inject(FlightSignalStore);
    return Promise.resolve(store.flightsValue());
  },
});
