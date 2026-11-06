import { Component, OnInit } from '@angular/core';
import { InfoDoctorComponent } from "./info-doctor/info-doctor.component";
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cont-doctores-recomendados',
  imports: [InfoDoctorComponent, CommonModule, RouterLink],
  templateUrl: './doctores-recomendados.component.html',
  providers: [DoctorService]
})
export class DoctoresRecomendadosComponent implements OnInit {
  doctores: Doctor[];

  constructor(private doctorService: DoctorService) {
    this.doctores = [];
  }

  ngOnInit() {
    this.doctorService.getXDoctors(4).subscribe(
      (doctores: Doctor[]) => {
        //console.log('Doctores recomendados:', doctores);
        if (doctores.length > 0) {
          this.doctores = doctores;
        }
      },
      error => {
        console.error('Error al recuperar los usuarios recomendados', error);
      });
  }

  
}
