import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { Flight } from '../../data/flight';
import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { FlightCard } from '../../ui/flight-card/flight-card';
import { initialAircraft } from '../../data/aircraft';
import { RouterLink } from "@angular/router";
import { FlightClient } from '../../data/flight-client';

@Component({
  selector: 'app-flight-search',
  imports: [FormField, JsonPipe, FlightCard, RouterLink, FormRoot],
  templateUrl: './flight-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearch {
  protected readonly filter = signal({
    from: 'Hamburg',
    to: 'Graz',
  });

  private flightClient = inject(FlightClient);

  protected readonly filterForm = form(this.filter);

  protected readonly selectedFlight = signal<Flight | null>(null);

  protected readonly flightsResource = this.flightClient.findResource(this.filterForm.from().value, this.filterForm.to().value);

  protected readonly flights = this.flightsResource.value;
  protected readonly error = this.flightsResource.error;
  protected readonly isLoading = this.flightsResource.isLoading;

  protected readonly delayInMin = signal(0);

  protected readonly flightsWithDelays = computed(() =>
    toFlightsWithDelays(this.flights(), this.delayInMin()),
  );

  protected readonly flightRoute = computed(() => `${this.filter().from} - ${this.filter().to}`);

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

export function initializeFlight(raw: unknown) {
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
