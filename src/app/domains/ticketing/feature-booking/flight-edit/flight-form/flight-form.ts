import { Component, effect, input, signal } from '@angular/core';
import { FieldTree, form, FormField } from '@angular/forms/signals';
import { Flight } from '../../../data/flight';
import { ValidationErrorsPane } from "../../../../shared/ui-forms/validation-errors/validation-errors-pane/validation-errors-pane";
import { FieldMetaDataPane } from '../../../../shared/ui-forms/field-meta-data-pane/field-meta-data-pane';
import { DelayStepper } from "../../../../shared/ui-common/delay-stepper/delay-stepper";

@Component({
  selector: 'app-flight-form',
  imports: [FormField, ValidationErrorsPane, FieldMetaDataPane, DelayStepper],
  templateUrl: './flight-form.html',
})
export class FlightForm {
  public readonly flight = input.required<FieldTree<Flight>>();

  protected readonly delay = signal(0);

  protected readonly delayForm = form(this.delay)

  constructor() {
    effect(() => {
      console.log(this.delayForm().value());
    })
  }
}
