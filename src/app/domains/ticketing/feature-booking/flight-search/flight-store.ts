import { computed, inject } from '@angular/core';
import { Flight } from '../../data/flight';
import { FlightClient } from '../../data/flight-client';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { withResource, withDevtools, withMutations, httpMutation, concatOp } from '@angular-architects/ngrx-toolkit';
import { withDevToolsForDebugMode } from '@flight/shared/ui-common/with-dev-tools-for-debug-mode';
import { ConfigService } from '@flight/shared/util-common/config-service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface FlightSearchState {
  from: string;
  to: string;
  basket: Record<number, boolean>;
  delayInMin: number;
}

export const FlightSignalStore = signalStore(
  { providedIn: 'root' },

  // withDevToolsForDebugMode('flight'),
  withDevtools('Flights'),

  withState<FlightSearchState>({
    from: 'Graz',
    to: 'Hamburg',
    basket: {},
    delayInMin: 0,
  }),

  withProps(() => ({
    _flightClient: inject(FlightClient),
    _configService: inject(ConfigService),
    _snackBar: inject(MatSnackBar),
  })),

  withResource(
    (store) => ({
      flights: store._flightClient.findResource(store.from, store.to),
    }),
    { errorHandling: 'previous value' },
  ),

  withComputed((store) => ({
    flightsWithDelay: computed(() => {
      return toFlightsWithDelays(store.flightsValue(), store.delayInMin());
    }),
  })),

  withMethods((store) => ({
    updateFilter(from: string, to: string): void {
      patchState(store, { from, to });
    },

    updateBasket(flightId: number, selected: boolean): void {
      patchState(store, (state) => ({
        basket: {
          ...state.basket,
          [flightId]: selected,
        },
      }));
    },

    reload(): void {
      store._flightsReload();
    },

    delay(): void {
      patchState(store, (state) => ({
        delayInMin: state.delayInMin + 15,
      }));
    },
  })),

  withHooks((store) => ({
    onInit() {
      console.log('FlightStore initialized', store.from(), store.to());
    },

    onDestroy() {
      console.log('flightStore destroyed', store.from(), store.to());
    },
  })),

  withMutations((store) => ({
    saveFlight: store._flightClient.createSaveRxMutation({
      onSuccess(result, param) {
        console.log("Flight sent to the server", param);
        console.log('Flight the server sent back', result);

        store._snackBar.open('Flights updated successfully', 'OK', {
          duration: 3000,
        })
      },
      onError(error, param) {
        console.log('Flight sent to the server', param);
        console.log('Flight the server sent back', error);

        store._snackBar.open('Failed to update flight', 'OK', {
          duration: 300,
        });
      }
    }),
  }))
);

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
