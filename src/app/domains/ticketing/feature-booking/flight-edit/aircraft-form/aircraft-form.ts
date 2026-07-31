import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Aircraft } from '../../../data/aircraft';
import { ValidationErrorsPane } from "../../../../shared/ui-forms/validation-errors/validation-errors-pane/validation-errors-pane";

@Component({
  selector: 'app-aircraft-form',
  imports: [ValidationErrorsPane, FormField],
  templateUrl: './aircraft-form.html',
})
export class AircraftForm {
  public readonly aircraft = input.required<FieldTree<Aircraft>>();
}
