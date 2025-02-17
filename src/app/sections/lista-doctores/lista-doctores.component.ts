import { Component, OnInit } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { InfoDoctorComponent } from "../doctores-recomendados/info-doctor/info-doctor.component";
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-lista-doctores',
  imports: [InfoDoctorComponent, HttpClientModule],
  templateUrl: './lista-doctores.component.html',
  styleUrl: './lista-doctores.component.css',
  providers: [DoctorService]
})
export class ListaDoctoresComponent implements OnInit {

  doctores: Doctor[];

  constructor(private doctorService: DoctorService) {
    this.doctores = [];
  }

  ngOnInit() {
    this.doctorService.getTodosDoctores().subscribe(
      (doctores: Doctor[]) => {
        this.doctores = doctores;
      },
      error => {
        console.error('Error al recuperar los todos los doctores', error);
      });
  }

}
