import { createMetadataKey, MetadataReducer } from '@angular/forms/signals';

const myOr: MetadataReducer<boolean, boolean> = {
  reduce(acc, item) {
    return acc || item;
  },
  getInitial() {
    return false;
  },
};

export const CITY = createMetadataKey(myOr);
