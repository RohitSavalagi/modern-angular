import { booleanAttribute, Component, effect, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-flight-edit',
  imports: [],
  templateUrl: './flight-edit.html',
})
export class FlightEdit {
  protected readonly id = input.required({
    transform: numberAttribute,
  });
  protected readonly showDetails = input({
    transform: booleanAttribute,
  });
  constructor() {
    effect(() => {
      console.log('id', this.id());
      console.log('showDetails', this.showDetails());
    });
  }
}
