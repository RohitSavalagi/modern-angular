import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Flight } from '../../data/flight';
import { initialAircraft } from '../../data/aircraft';
import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-search',
  imports: [FormField, JsonPipe, DatePipe],
  templateUrl: './flight-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearch {
  private readonly httpClient = inject(HttpClient);

  protected readonly filter = signal({
    from: 'Hamburg',
    to: 'Graz',
  });

  protected readonly filterForm = form(this.filter);
  protected readonly flights = signal<Flight[]>([]);

  protected readonly selectedFlight = signal<Flight | null>(null);

  protected search(): void {
    const url = 'https://demo.angulararchitects.io/api/flight'

    const filter = this.filter();

    const params = {
      from: filter.from,
      to: filter.to,
    }

    this.httpClient.get<Flight[]>(url, { params }).subscribe({
      next: (flights: Flight[]) => {
        this.flights.set(flights);
      },
      error: (err) => {
        console.error('Error', err)
      }
    });
  }

  protected select(flight: Flight): void {
    this.selectedFlight.set(flight);
  }
}
