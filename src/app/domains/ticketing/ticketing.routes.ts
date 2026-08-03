import { Routes } from "@angular/router";
import { BookingNavigation } from "./feature-booking/booking-navigation";
import { FlightSearch } from "./feature-booking/flight-search/flight-search";
import { FlightEdit } from "./feature-booking/flight-edit/flight-edit";
import { PassengerSearch } from "./feature-booking/passenger-search/passenger-search";
import { PassengerEdit } from "./feature-booking/passenger-edit/passenger-edit";
import { passengerResolver } from "./feature-booking/passenger-edit/passenger-resolver";
import { inject, provideEnvironmentInitializer } from "@angular/core";
import { authGuard } from "@flight/shared/util-auth/auth.guard";
import { exitGuard } from "@flight/shared/ui-common/exit.guard";
import { TicketingChatService } from "./ai/ticketing-chat-service";

export const ticketingRoutes: Routes = [
  {
    path: 'booking',
    component: BookingNavigation,
    providers: [
      provideEnvironmentInitializer(() => {
        console.log('init bookingRoutes');
      })
    ],
    resolve: {
      ai: configAi,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'flight-search',
      },
      { path: 'flight-search', component: FlightSearch },
      {
        path: 'flight-edit/:id',
        component: FlightEdit,
        canActivate: [authGuard],
        canDeactivate: [exitGuard],
      },
      {
        path: 'passenger-search',
        component: PassengerSearch,
      },
      {
        path: 'passenger-edit/:id',
        component: PassengerEdit,
        resolve: {
          passenger: passengerResolver,
        },
      },
    ],
  },
];


function configAi() {
  console.log("Chat setting");
  inject(TicketingChatService).init();
  return true;
}
