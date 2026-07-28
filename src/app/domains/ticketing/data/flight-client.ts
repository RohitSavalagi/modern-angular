import { httpResource } from '@angular/common/http';
import { inject, Service, Signal } from '@angular/core';
import { Flight } from './flight';
import { initializeFlight } from '../feature-booking/flight-search/flight-search';
import { ConfigService } from '../../shared/util-common/config-service';

@Service()
export class FlightClient {
  private readonly configService = inject(ConfigService);

  findResource(from: Signal<string>, to: Signal<string>) {
    return httpResource<Flight[]>(
      () => {
        if (!from() || !to()) return undefined;

        return {
          url: `${this.configService.baseUrl}/flight`,
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
