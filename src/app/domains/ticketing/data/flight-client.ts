import { httpResource } from '@angular/common/http';
import { Service, Signal } from '@angular/core';
import { Flight } from './flight';
import { initializeFlight } from '../feature-booking/flight-search/flight-search';

@Service()
export class FlightClient {
  private readonly baseUrl = 'https://demo.angulararchitects.io/api';

  findResource(from: Signal<string>, to: Signal<string>) {
    return httpResource<Flight[]>(
      () => {


        if (!from() || !to()) return undefined;

        return {
          url: `${this.baseUrl}/flight`,
          params: {
            from: from(),
            to: to(),
          },
        };
      },
      {
        // TODO: check later
        defaultValue: [],
        parse: (raw) => {
          const flights = raw as Flight[];
          return flights.map((flight) => initializeFlight(flight));
        },
      },
    );
  }
}
