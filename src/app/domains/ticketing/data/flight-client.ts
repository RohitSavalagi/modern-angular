import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, Signal } from '@angular/core';
import { Flight, initialFlight } from './flight';
import { initializeFlight } from '../feature-booking/flight-search/flight-search';
import { ConfigService } from '../../shared/util-common/config-service';
import { Observable } from 'rxjs';

@Service()
export class FlightClient {
  private readonly configService = inject(ConfigService);
  private http = inject(HttpClient);

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

  findResourceById(id: Signal<number>) {
    return httpResource<Flight>(
      () => ({
        url: `${this.configService.baseUrl}/flight`,
        headers: {
          Accept: 'application/json',
        },
        params: {
          id: id(),
        },
      }),
      // TODO: Extend Service
      {
        defaultValue: initialFlight,
        parse: (raw) => {
          return initializeFlight(raw);
        },
      },
    );
  }

    create(flight: Flight): Observable<Flight> {
    const url = `${this.configService.baseUrl}/flight`;

    const headers = {
      Accept: 'application/json',
    };

    return this.http.post<Flight>(url, flight, { headers });
  }

  update(flight: Flight): Observable<Flight> {
    const url = `${this.configService.baseUrl}/flight/${flight.id}`;

    const headers = {
      Accept: 'application/json',
    };

    return this.http.put<Flight>(url, flight, { headers });
  }
}
