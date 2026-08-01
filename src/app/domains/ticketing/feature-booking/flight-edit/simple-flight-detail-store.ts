import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Flight } from '../../data/flight';
import { FlightClient } from '../../data/flight-client';
import { patchState, signalMethod, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools, withMutations, withResource } from '@angular-architects/ngrx-toolkit';

export const FlightDetailSignalStore = signalStore(
  { providedIn: 'root' },

  withDevtools('flightDetail'),

  withState({
    flightId: 0
  }),

  withProps(() => ({
    _flightClient: inject(FlightClient),
    _snackBar: inject(MatSnackBar),
  })),

  withResource(
    (store) => ({
      flight: store._flightClient.findResourceById(store.flightId),
    }),
    { errorHandling: 'previous value' },
  ),

  withMutations((store) => ({
    saveFlight: store._flightClient.createSaveMutation({
      onSuccess() {
        store._snackBar.open('Flight Updated successfully', 'OK', {
          duration: 3000
        });
      },
      onError: (error: unknown) => {
        const message = 'Failed to update flight';
        console.error(message, error);
        store._snackBar.open(message, 'OK', {
          duration: 3000
        })
      }
    })
  })),

  withMethods((store) => ({
    setFlightId: (id: number) => {
      patchState(store, { flightId: id });
    },

    connectFlightId: signalMethod<number>((id) => {
      patchState(store, (state) => ({
        ...state,
        flightId: id
      }))
    }),

    updateLocalFlight(flight: Partial<Flight>): void {
      patchState(store, (state) => ({
        flightValue: {
          ...state.flightValue,
          ...flight,
        }
      }))
    },

    reload: () => {
      store._flightReload();
    }
  }))
)
