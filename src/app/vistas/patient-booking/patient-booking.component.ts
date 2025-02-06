import { Component } from '@angular/core';
import { CalendarComponent } from "../../sections/calendar/calendar.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";

@Component({
  selector: 'app-patient-booking',
  imports: [CalendarComponent, SecundaryNavComponent],
  templateUrl: './patient-booking.component.html',
  styleUrl: './patient-booking.component.css'
})
export class PatientBookingComponent {

}
