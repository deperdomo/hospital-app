import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { BanerComponent } from "./baner/baner.component";
import { InfoDoctorComponent } from "./info-doctor/info-doctor.component";
import { NavBeforeLoginComponent } from "./navs/nav-before-login/nav-before-login.component";
import { NearbyDoctorsComponent } from "./nearby-doctors/nearby-doctors/nearby-doctors.component";
import { NearbyDoctorsDisabledComponent } from "./nearby-doctors/nearby-doctors-disabled/nearby-doctors-disabled.component";
import { FooterConmponent } from "./footer/footer.component";
import { SecundaryNavComponent } from "./navs/secundary-nav/secundary-nav.component";
import { LeftNavComponent } from "./navs/left-nav/left-nav.component";


@Component({
  selector: 'app-root',
  imports: [BanerComponent, InfoDoctorComponent, NavBeforeLoginComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, RouterOutlet, FooterConmponent, SecundaryNavComponent, LeftNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-vita';

  isNerbyDoctorsAvailable = false;

  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }

  constructor(private router: Router) {}

  esPaginaDeAutenticacion(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/registro');
  }
}
