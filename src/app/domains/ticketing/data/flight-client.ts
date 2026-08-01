import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Flight, initialFlight } from './flight';
import { initializeFlight } from '../feature-booking/flight-search/flight-search';
import { ConfigService } from '../../shared/util-common/config-service';
import { Observable } from 'rxjs';
import { concatOp, httpMutation, HttpMutationOptions, rxMutation } from '@angular-architects/ngrx-toolkit';

@Injectable({ providedIn: 'root' })
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

  createSaveMutation(options: Partial<HttpMutationOptions<Flight, Flight>>) {
    return httpMutation({
      ...options,
      request: (flight: Flight) => ({
        url: this.configService.baseUrl + `/flight/${flight.id}`,
        method: 'PUT',
        body: flight,
        headers: {
          Accept: 'application/json',
        },
      }),
      operator: concatOp,
    })
  }


  createSaveRxMutation(options: Partial<HttpMutationOptions<Flight, Flight>>) {
    return rxMutation({
      ...options,
      operation: (flight: Flight) => this.update(flight),
      operator: concatOp,
    })
  }
}
