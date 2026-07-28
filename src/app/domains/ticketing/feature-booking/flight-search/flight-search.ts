import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Flight } from '../../data/flight';
import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { FlightCard } from '../../ui/flight-card/flight-card';
import { initialAircraft } from '../../data/aircraft';

@Component({
  selector: 'app-flight-search',
  imports: [FormField, JsonPipe, FlightCard],
  templateUrl: './flight-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearch {
  protected readonly filter = signal({
    from: 'Hamburg',
    to: 'Graz',
  });

  protected readonly filterForm = form(this.filter);

  protected readonly selectedFlight = signal<Flight | null>(null);

  protected readonly flightsResource = httpResource<Flight[]>(
    () => {
      const filter = {
        from: this.filter().from,
        to: this.filter().to,
      };

      if (!filter.from || !filter.to) return undefined;

      return {
        url: 'https://demo.angulararchitects.io/api/flight',
        params: {
          from: filter.from,
          to: filter.to,
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

  protected readonly flights = this.flightsResource.value;
  protected readonly error = this.flightsResource.error;
  protected readonly isLoading = this.flightsResource.isLoading;

  protected readonly delayInMin = signal(0);

  protected readonly flightsWithDelays = computed(() =>
    toFlightsWithDelays(this.flights(), this.delayInMin()),
  );

  protected readonly flightRoute = computed(() => `${this.filter().from} to ${this.filter().to}`);

  protected search(): void {
    this.flightsResource.reload();
  }

  protected select(flight: Flight): void {
    this.selectedFlight.set(flight);
  }

  protected readonly basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  protected updateBasket(flightId: number, selected: boolean): void {
    this.basket.update((basket) => ({
      ...basket,
      [flightId]: selected,
    }));
  }
}

function initializeFlight(raw: unknown) {
  const flight = raw as Flight;
  flight.aircraft = initialAircraft;
  flight.prices = [];
  flight.delay = flight.delayed ? 15 : 0;
  return flight;
}

function toFlightsWithDelays(flights: Flight[], delay: number): Flight[] {
  if (flights.length === 0) {
    return [];
  }
  const ONE_MINUTE = 1000 * 60;
  const oldFlights = flights;
  const oldFlight = oldFlights[0];
  const oldDate = new Date(oldFlight.date);
  const newDate = new Date(oldDate.getTime() + delay * ONE_MINUTE);
  const newFlight = { ...oldFlight, date: newDate.toISOString() };
  return [newFlight, ...flights.slice(1)];
}
