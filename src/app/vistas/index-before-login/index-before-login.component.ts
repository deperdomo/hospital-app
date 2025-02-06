import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NavBeforeLoginComponent } from "../../navs/nav-before-login/nav-before-login.component";
import { BanerComponent } from "../../sections/baner/baner.component";
import { FindNavComponent } from "../../navs/find-nav/find-nav.component";
import { InfoDoctorComponent } from "../../sections/info-doctor/info-doctor.component";
import { NearbyDoctorsComponent } from "../../nearby-doctors/nearby-doctors/nearby-doctors.component";
import { NearbyDoctorsDisabledComponent } from "../../nearby-doctors/nearby-doctors-disabled/nearby-doctors-disabled.component";
import { FooterConmponent } from "../../footer/footer.component";


@Component({
  selector: 'app-index-before-login',
  imports: [NavBeforeLoginComponent, BanerComponent, FindNavComponent, InfoDoctorComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, FooterConmponent],
  templateUrl: './index-before-login.component.html',
  styleUrl: './index-before-login.component.css'
})
export class IndexBeforeLoginComponent {
  isNerbyDoctorsAvailable = false;

  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }

  constructor(private router: Router) {}

  esPaginaDeAutenticacion(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/registro');
  }
}
