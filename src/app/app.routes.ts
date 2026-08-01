import { Routes } from '@angular/router';
import { Home } from './shell/home/home';
import { FlightEdit } from './domains/ticketing/feature-booking/flight-edit/flight-edit';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'next-flights',
    loadChildren: () =>
      import('./domains/ticketing/feature-next-flights/next-flights.module').then(
        (m) => m.NextFlightsModule,
      ),
  },
  {
    path: 'ticketing',
    loadChildren: () =>
      import('./domains/ticketing/ticketing.routes').then((m) => m.ticketingRoutes),
  },
  {
    path: 'luggage',
    loadComponent: () =>
      import('./domains/luggage/feature-luggage/luggage-overview/luggage-overview').then(
        (m) => m.LuggageOverview,
      ),
  },
  {
    path: 'about',
    loadComponent: () => import('./shell/about/about').then((c) => c.About),
  },
  {
    path: 'flight-edit/:id',
    component: FlightEdit,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
