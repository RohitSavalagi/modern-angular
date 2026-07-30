import {
  booleanAttribute,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  numberAttribute,
} from '@angular/core';
import { SimpleFlightDetailStore } from './simple-flight-detail-store';
import { Flight } from '../../data/flight';
import { toLocalDateTimeString } from '../../../shared/util-common/date-utils';
import {
  form,
  minLength,
  required,
  FormField,
  FormRoot,
  schema,
  debounce,
  validateStandardSchema,
  FieldTree,
  applyWhenValue,
  min,
  apply,
  applyEach,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlightZodSchema } from '../../data/flight-zod-schema';
import { extractError } from '../../../shared/util-common/extract-error';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateCity, validateRoundTripTree } from '../../data/flight-validators';
import { ValidationErrorsPane } from '../../../shared/ui-forms/validation-errors/validation-errors-pane/validation-errors-pane';
import { aircraftSchema } from '../../data/aircraft-schema';
import { initialPrice, priceSchema } from '../../data/price-schema';

@Component({
  selector: 'app-flight-edit',
  imports: [FormField, JsonPipe, FormRoot, RouterLink, ValidationErrorsPane],
  templateUrl: './flight-edit.html',
})
export class FlightEdit {
  private readonly store = inject(SimpleFlightDetailStore);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly id = input.required({
    transform: numberAttribute,
  });

  protected readonly showDetails = input({
    transform: booleanAttribute,
  });

  protected readonly prices = linkedSignal(() => this.flightForm.prices);

  protected readonly flight = linkedSignal(() => normalizeFlight(this.store.flight()));

  constructor() {
    effect(() => {
      console.log('id', this.id());
      console.log('showDetails', this.showDetails());

      this.route.paramMap.subscribe((paramsMap) => {
        const flightId = parseInt(paramsMap.get('id') ?? '0');
        this.store.setFlightId(flightId);
      });
    });
  }

  protected readonly flightForm = form(this.flight, flightSchema, {
    submission: {
      action: async (form) => this.save(form),
      ignoreValidators: 'none',
      onInvalid: (form) => this.reportValidationError(form),
    },
  });

  private reportValidationError(form: FieldTree<Flight>): void {
    this.snackBar.open('Please correct the validation errors', 'OK');

    const errors = form().errorSummary();
    if (errors.length > 0) {
      errors[0].fieldTree().focusBoundControl();
    }
  }

  protected async save(form: FieldTree<Flight>) {
    try {
      await this.store.saveFlight(form().value());
      return null;
    } catch (error) {
      return {
        kind: 'processing_error',
        error: extractError(error),
      };
    }
  }

  addPrice(): void {
    const prices = this.prices();
    prices().value.update((prices) => [...prices, { ...initialPrice }]);
  }

  protected readonly isDisabled = computed(() => this.flightForm().invalid());
}

function normalizeFlight(flight: Flight): Flight {
  return {
    ...flight,
    date: toLocalDateTimeString(flight.date),
  };
}

export const flightSchema = schema<Flight>((path) => {
  apply(path.aircraft, aircraftSchema);
  applyEach(path.prices, priceSchema);
  validateStandardSchema(path, FlightZodSchema);
  debounce(path, 'blur');
  required(path.from, { message: 'Please enter the value!' });
  required(path.to);
  required(path.date);
  minLength(path.from, 3);
  validateRoundTripTree(path);

  const allowed = ['Graz', 'Hamburg', 'Zürich'];
  validateCity(path.from, allowed);

  applyWhenValue(path, (flight) => flight.delayed, delayedFlight);
});

export const delayedFlight = schema<Flight>((path) => {
  required(path.delay);
  min(path.delay, 15);
});
