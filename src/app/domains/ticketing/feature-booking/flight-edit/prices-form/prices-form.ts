import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Price } from '../../../data/price';
import { ValidationErrorsPane } from '../../../../shared/ui-forms/validation-errors/validation-errors-pane/validation-errors-pane';
import { initialPrice } from '../../../data/price-schema';

@Component({
  selector: 'app-prices-form',
  imports: [ValidationErrorsPane, FormField],
  templateUrl: './prices-form.html',
})
export class PricesForm {
  public readonly prices = input.required<FieldTree<Price[]>>();

  protected addPrice(): void {
    const prices = this.prices();
    prices().value.update((prices) => [...prices, { ...initialPrice }]);
  }
}
