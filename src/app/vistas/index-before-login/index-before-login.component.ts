import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NavBeforeLoginComponent } from "../../navs/nav-before-login/nav-before-login.component";
import { BanerComponent } from "../../sections/baner/baner.component";
import { FindNavComponent } from "../../navs/find-nav/find-nav.component";
import { NearbyDoctorsComponent } from "../../nearby-doctors/nearby-doctors/nearby-doctors.component";
import { NearbyDoctorsDisabledComponent } from "../../nearby-doctors/nearby-doctors-disabled/nearby-doctors-disabled.component";
import { FooterConmponent } from "../../footer/footer.component";
import { DoctoresRecomendadosComponent } from "../../sections/doctores-recomendados/doctores-recomendados.component";
import { Doctor } from '../../models/doctor';


@Component({
  selector: 'app-index-before-login',
  imports: [NavBeforeLoginComponent, BanerComponent, FindNavComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, FooterConmponent, HttpClientModule, DoctoresRecomendadosComponent],
  templateUrl: './index-before-login.component.html',
  styleUrl: './index-before-login.component.css',
})

export class IndexBeforeLoginComponent {
  isNerbyDoctorsAvailable = false;
  doctoresDeBusqueda: Doctor[] = [];
  doctoresCercanos: Doctor[] = [];

  constructor( private router: Router) {}



  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }

  esPaginaDeAutenticacion(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/registro');
  }

  recibirDoctoresDeBusqueda(doctores: Doctor[]) {
    this.doctoresDeBusqueda = doctores;
    console.log('Doctores recibidos de find-nav:', doctores);
  }
  recibirDoctoresCercanos(doctores: Doctor[]) {
    this.doctoresCercanos = doctores;
    console.log('Doctores recibidos de nearby:', doctores);
  }

}
