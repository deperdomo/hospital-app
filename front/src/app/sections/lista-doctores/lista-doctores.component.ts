import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, of } from 'rxjs';

import { InfoDoctorComponent } from "../doctores-recomendados/info-doctor/info-doctor.component";
import { DoctorService } from '../../services/doctor.service';
import { DisponibilidadService } from '../../services/disponibilidad.service';
import { Doctor } from '../../models/doctor';
import { Disponibilidad } from '../../models/disponibilidad';

@Component({
  selector: 'app-lista-doctores',
  imports: [InfoDoctorComponent],
  templateUrl: './lista-doctores.component.html',
  styleUrl: './lista-doctores.component.css',
  providers: [DoctorService, DisponibilidadService]
})
export class ListaDoctoresComponent implements OnInit {

  doctores: Doctor[] = [];
  /** Horario de cada doctor por id: 1 petición en vez de 1 por tarjeta. */
  disponibilidades: Record<number, Disponibilidad> = {};

  constructor(private doctorService: DoctorService, private disponibilidadService: DisponibilidadService) {}

  ngOnInit() {
    forkJoin([this.doctorService.getTodosDoctores(), this.disponibilidadService.getTodas().pipe(catchError(() => of([] as Disponibilidad[])))]).subscribe({
      next: ([doctores, disponibilidades]) => {
        for (const d of disponibilidades) this.disponibilidades[d.doctor.id] = d;
        this.doctores = doctores; // sin horario precargado, cada tarjeta lo pide como antes
      },
      error: error => console.error('Error al recuperar los doctores', error),
    });
  }

}
