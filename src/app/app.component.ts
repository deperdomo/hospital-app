import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { InfoDoctorComponent } from "./sections/info-doctor/info-doctor.component";
import { NavBeforeLoginComponent } from "./navs/nav-before-login/nav-before-login.component";
import { NearbyDoctorsComponent } from "./nearby-doctors/nearby-doctors/nearby-doctors.component";
import { NearbyDoctorsDisabledComponent } from "./nearby-doctors/nearby-doctors-disabled/nearby-doctors-disabled.component";
import { FooterConmponent } from "./footer/footer.component";
import { FindNavComponent } from "./navs/find-nav/find-nav.component";
import { BanerComponent } from "./sections/baner/baner.component";


@Component({
  selector: 'app-root',

  imports: [BanerComponent, InfoDoctorComponent, NavBeforeLoginComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, RouterOutlet, FooterConmponent, FindNavComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isNerbyDoctorsAvailable = false;

  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }

  constructor(private router: Router) {}

  esPaginaDeAutenticacion(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/registro');
  }
}
