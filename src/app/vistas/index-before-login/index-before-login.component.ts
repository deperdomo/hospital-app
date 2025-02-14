import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NavBeforeLoginComponent } from "../../navs/nav-before-login/nav-before-login.component";
import { BanerComponent } from "../../sections/baner/baner.component";
import { FindNavComponent } from "../../navs/find-nav/find-nav.component";
import { InfoDoctorComponent } from "../../sections/doctores-recomendados/info-doctor/info-doctor.component";
import { NearbyDoctorsComponent } from "../../nearby-doctors/nearby-doctors/nearby-doctors.component";
import { NearbyDoctorsDisabledComponent } from "../../nearby-doctors/nearby-doctors-disabled/nearby-doctors-disabled.component";
import { FooterConmponent } from "../../footer/footer.component";

import { DoctorService } from '../../services/doctor.service';

import { DoctoresRecomendadosComponent } from "../../sections/doctores-recomendados/doctores-recomendados.component";



@Component({
  selector: 'app-index-before-login',
  imports: [NavBeforeLoginComponent, BanerComponent, FindNavComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, FooterConmponent, HttpClientModule, DoctoresRecomendadosComponent],
  templateUrl: './index-before-login.component.html',
  styleUrl: './index-before-login.component.css',
})
export class IndexBeforeLoginComponent {
  isNerbyDoctorsAvailable = false;

  constructor( private router: Router) {}



  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }

  esPaginaDeAutenticacion(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/registro');
  }
}
