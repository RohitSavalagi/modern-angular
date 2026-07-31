import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Flight } from '../../../data/flight';
import { ValidationErrorsPane } from "../../../../shared/ui-forms/validation-errors/validation-errors-pane/validation-errors-pane";

@Component({
  selector: 'app-flight-form',
  imports: [FormField, ValidationErrorsPane],
  templateUrl: './flight-form.html',
})
export class FlightForm {
  public readonly flight = input.required<FieldTree<Flight>>();
}
