import { Component } from '@angular/core';
import { CalendarComponent } from "../../sections/calendar/calendar.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { UserWelcomeNavComponent } from "../../navs/user-welcome-nav/user-welcome-nav.component";
import { UserNavComponent } from "../../navs/user-nav/user-nav.component";
import { TitleJakartaComponent } from "../../navs/title-jakarta/title-jakarta.component";

@Component({
  selector: 'app-patient-booking',
  imports: [CalendarComponent, SecundaryNavComponent, UserWelcomeNavComponent, UserNavComponent, TitleJakartaComponent],
  templateUrl: './patient-booking.component.html',
})
export class PatientBookingComponent {

}
