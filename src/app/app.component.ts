import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BanerComponent } from "./baner/baner.component";
import { InfoDoctorComponent } from "./info-doctor/info-doctor.component";
import { NavBeforeLoginComponent } from "./nav-before-login/nav-before-login.component";
import { NearbyDoctorsComponent } from "./nearby-doctors/nearby-doctors.component";
import { NearbyDoctorsDisabledComponent } from "./nearby-doctors-disabled/nearby-doctors-disabled.component";

@Component({
  selector: 'app-root',
  imports: [ BanerComponent, InfoDoctorComponent, NavBeforeLoginComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-vita';

  isNerbyDoctorsAvailable = false;

  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }
}
