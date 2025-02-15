import { DisponibilidadService } from './../../../services/disponibilidad.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Doctor } from '../../../models/doctor';
import { CommonModule, DatePipe } from '@angular/common';
import { Disponibilidad } from '../../../models/disponibilidad';


@Component({
  selector: 'app-info-doctor',
  imports: [CommonModule],
  templateUrl: './info-doctor.component.html',
  styleUrl: './info-doctor.component.css',
  providers: [DisponibilidadService, DatePipe]
})
export class InfoDoctorComponent {
  @Input() doctor!: Doctor ;
  disponibilidad: Disponibilidad;

  constructor(private dispoService: DisponibilidadService, private router: Router) {
    this.disponibilidad = {
      id: 1,
      horaInicio: '08:00:00', // Ejemplo de cadena HH:mm:ss
      horaFin: '16:00:00',
      estado: 'activo',
      comentarios: 'N/A',
      doctor: {
        id: 1,
        nombre: 'Dr. Example',
        username: 'dexample',
        apellidos: 'Example Apellido',
        email: 'example@example.com',
        provincia: 'Madrid',
        localidad: 'Madrid',
        direccion: '123 Example St',
        fechaAlta: '2025-01-01',
        fotoPerfil: 'url_to_image',
        password: 'password123',
        experiencia: 10,
        precioConsulta: 100,
        especialidad: { id: 1, nombre: 'Cardiología' },
        sexo: 'M'
      }
    };
  }

  ngOnInit() {
    if (this.doctor) {
      this.dispoService.getDisponibilidadDoctor(this.doctor.id).subscribe(
        (disponibilidad: Disponibilidad) => {
          console.log('Disponibilidad del doctor:', disponibilidad);
          this.disponibilidad = disponibilidad;
        },
        (error) => {
          console.error('Error al obtener la disponibilidad del doctor', error);
    });
    }
  }

  navigateToNewAppointment(doctorId: number) {
    this.router.navigate(['/nuevaCita', doctorId]);
  }

  obtenerHoraMinutos(hora: string): string {
    return hora.substring(0, 5);
  }



}
