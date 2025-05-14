import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InfoDoctorComponent } from "./info-doctor/info-doctor.component";
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cont-doctores-recomendados',
  imports: [InfoDoctorComponent, HttpClientModule, CommonModule],
  templateUrl: './doctores-recomendados.component.html',
  styleUrls: ['./doctores-recomendados.component.css'],
  providers: [DoctorService]
})
export class DoctoresRecomendadosComponent implements OnInit {
  doctores: Doctor[];

  constructor(private doctorService: DoctorService) {
    this.doctores = [];
  }

  ngOnInit() {
    this.doctorService.getXDoctors(3).subscribe(
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
