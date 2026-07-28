import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-booking-navigation',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './booking-navigation.html',
})
export class BookingNavigation {}
