import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NavBeforeLoginComponent } from "../../navs/nav-before-login/nav-before-login.component";
import { BanerComponent } from "../../sections/baner/baner.component";
import { FindNavComponent } from "../../navs/find-nav/find-nav.component";
import { InfoDoctorComponent } from "../../sections/info-doctor/info-doctor.component";
import { NearbyDoctorsComponent } from "../../nearby-doctors/nearby-doctors/nearby-doctors.component";
import { NearbyDoctorsDisabledComponent } from "../../nearby-doctors/nearby-doctors-disabled/nearby-doctors-disabled.component";
import { FooterConmponent } from "../../footer/footer.component";

import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';



@Component({
  selector: 'app-index-before-login',
  imports: [NavBeforeLoginComponent, BanerComponent, FindNavComponent, InfoDoctorComponent, NearbyDoctorsComponent, NearbyDoctorsDisabledComponent, FooterConmponent, HttpClientModule],
  templateUrl: './index-before-login.component.html',
  styleUrl: './index-before-login.component.css',
  providers: [DoctorService]
})
export class IndexBeforeLoginComponent {
  isNerbyDoctorsAvailable = false;
  doctor1: Doctor | null = null;
  doctor2: Doctor | null = null;
  doctor3: Doctor | null = null;

  constructor( private router: Router, private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getXDoctors(3).subscribe(
      (doctores: Doctor[]) => {
        console.log('Doctores recomendados:', doctores);
        if (doctores.length > 0) {
          this.doctor1 = doctores[0] || null;
          this.doctor2 = doctores[1] || null;
          this.doctor3 = doctores[2] || null;
        }
      },
      error => {
        console.error('Error al recuperar los usuarios recomendados', error);
      });
  }

  cambiarEstado() {
    this.isNerbyDoctorsAvailable = true; // Cambiamos la variable a true
  }

  esPaginaDeAutenticacion(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/registro');
  }
}
