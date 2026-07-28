import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Flight } from '../../data/flight';
import { DatePipe, JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-flight-search',
  imports: [FormField, JsonPipe, DatePipe],
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
    { defaultValue: [] },
  );

  protected readonly flights = this.flightsResource.value;
  protected readonly error = this.flightsResource.error;
  protected readonly isLoading = this.flightsResource.isLoading;

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
