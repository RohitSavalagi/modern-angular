import { SchemaPath, validate } from "@angular/forms/signals";

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
