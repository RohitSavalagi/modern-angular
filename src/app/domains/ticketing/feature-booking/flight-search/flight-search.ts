import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { Flight } from '../../data/flight';
import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { FlightCard } from '../../ui/flight-card/flight-card';
import { initialAircraft } from '../../data/aircraft';
import { RouterLink } from '@angular/router';
import { FlightStore } from './flight-store';

@Component({
  selector: 'app-flight-search',
  imports: [FormField, JsonPipe, FlightCard, RouterLink, FormRoot],
  templateUrl: './flight-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearch {
  private readonly store = inject(FlightStore);
  protected readonly filter = linkedSignal(() => ({
    from: this.store.from(),
    to: this.store.to(),
  }));
  protected readonly filterForm = form(this.filter);
  protected readonly flights = this.store.flightsWithDelays;
  protected readonly isLoading = this.store.flightsIsLoading;
  protected readonly error = this.store.flightsError;
  protected readonly basket = this.store.basket;
  protected readonly flightRoute = computed(() => this.filter().from + ' - ' + this.filter().to);
  constructor() {
    this.showError();
  }
  protected search(): void {
    this.store.updateFilter(this.filter().from, this.filter().to);
    this.store.reload();
  }
  protected updateBasket(flightId: number, selected: boolean): void {
    this.store.updateBasket(flightId, selected);
  }
  protected delay(): void {
    this.store.delay();
  }
  private showError() {
    effect(() => {
      const error = this.error();
      // checking for the string error is just for demonstration purposes.
      if (error || this.filter().to === 'error') {
        const message = 'Error loading flights: ' + error;
        console.log(message);
      }
    });
  }
}

export function initializeFlight(raw: unknown) {
  const flight = raw as Flight;
  flight.aircraft = initialAircraft;
  flight.prices = [];
  flight.delay = flight.delayed ? 15 : 0;
  return flight;
}
