import { SchemaPath, SchemaPathTree, validate, validateTree } from '@angular/forms/signals';
import { Flight } from './flight';

export function validateCity(path: SchemaPath<string>, allowed: string[]) {
  validate(path, (ctx) => {
    const value = ctx.value();
    if (allowed.includes(value)) {
      return null;
    }

    return {
      kind: 'city',
      value,
      allowed,
    };
  });
}

export function validateRoundTrip(path: SchemaPathTree<Flight>) {
  validate(path, (ctx) => {
    const from = ctx.fieldTree.from().value();
    const to = ctx.fieldTree.to().value();
    // Alternative:
    // const from = ctx.valueOf(path.from);
    // const to = ctx.valueOf(path.to);
    if (from === to) {
      return {
        kind: 'roundtrip',
        from,
        to,
      };
    }
    return null;
  });
}

export function validateRoundTrip2(path: SchemaPathTree<Flight>) {
  // Now, we are validating the 'from' field only
  validate(path.from, (ctx) => {
    const from = ctx.value();
    const to = ctx.valueOf(path.to);
    if (from === to) {
      return {
        kind: 'roundtrip',
        from,
        to,
      };
    }
    return null;
  });
}

export function validateRoundTripTree(path: SchemaPathTree<Flight>) {
  validateTree(path, (ctx) => {
    const from = ctx.fieldTree.from().value();
    const to = ctx.fieldTree.to().value();
    if (from === to) {
      return {
        kind: 'roundtrip_tree',
        field: ctx.fieldTree.from,
        from,
        to,
      };
    }
    return null;
  });
}
