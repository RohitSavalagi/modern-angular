import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { createTool } from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';

export const getCurrentRoute = createTool({
  name: 'getCurrentRoute',
  description: `
    returns the current route path as a string
  `,
  schema: s.object('No input parameters', {}),
  handler: () => {
    const router = inject(Router);
    return Promise.resolve(router.url);
  },
});
