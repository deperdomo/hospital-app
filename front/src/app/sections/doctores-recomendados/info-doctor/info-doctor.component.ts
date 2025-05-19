import { DisponibilidadService } from './../../../services/disponibilidad.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Doctor } from '../../../models/doctor';
import { CommonModule, DatePipe } from '@angular/common';
import { Disponibilidad } from '../../../models/disponibilidad';
import { Usuario } from '../../../models/usuario';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita';

@Component({
  selector: 'app-info-doctor',
  imports: [CommonModule],
  templateUrl: './info-doctor.component.html',
  styleUrl: './info-doctor.component.css',
  providers: [DisponibilidadService, CitaService, DatePipe]
})
export class InfoDoctorComponent {
  disponibilidad: Disponibilidad;
  usuario: Usuario;
  citapendiente: Cita;
  showModal = false;

  svg = {
    disponibilidad: 'M7.5 13A5.506 5.506 0 0 1 2 7.5C2 4.467 4.467 2 7.5 2S13 4.467 13 7.5S10.533 13 7.5 13m0-12a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13m3 6H8V3.5a.5.5 0 0 0-1 0v4a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1',
    precio: 'M184 89.57V84c0-25.08-37.83-44-88-44S8 58.92 8 84v40c0 20.89 26.25 37.49 64 42.46V172c0 25.08 37.83 44 88 44s88-18.92 88-44v-40c0-20.7-25.42-37.32-64-42.43M232 132c0 13.22-30.79 28-72 28c-3.73 0-7.43-.13-11.08-.37C170.49 151.77 184 139 184 124v-18.26c29.87 4.45 48 16.53 48 26.26M72 150.25v-23.79A184 184 0 0 0 96 128a184 184 0 0 0 24-1.54v23.79A163 163 0 0 1 96 152a163 163 0 0 1-24-1.75m96-40.32V124c0 8.39-12.41 17.4-32 22.87V123.5c12.91-3.13 23.84-7.79 32-13.57M96 56c41.21 0 72 14.78 72 28s-30.79 28-72 28s-72-14.78-72-28s30.79-28 72-28m-72 68v-14.07c8.16 5.78 19.09 10.44 32 13.57v23.37C36.41 141.4 24 132.39 24 124m64 48v-4.17c2.63.1 5.29.17 8 .17c3.88 0 7.67-.13 11.39-.35a122 122 0 0 0 12.61 3.76v23.46c-19.59-5.47-32-14.48-32-22.87m48 26.25V174.4a179.5 179.5 0 0 0 24 1.6a184 184 0 0 0 24-1.54v23.79a165.5 165.5 0 0 1-48 0m64-3.38V171.5c12.91-3.13 23.84-7.79 32-13.57V172c0 8.39-12.41 17.4-32 22.87',
    corazon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    modal: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }

  @Input() doctor!: Doctor;

  constructor(private dispoService: DisponibilidadService, private citaService: CitaService, private router: Router) {
    this.usuario = {} as Usuario;
    this.citapendiente = {} as Cita;
    this.disponibilidad = {
      id: 1,
      horaInicio: '00:00:00', // Ejemplo de cadena HH:mm:ss
      horaFin: '00:00:00',
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
        sexo: 'M',
        votos: 0
      }
    };
  }

  ngOnInit() {
    if (this.doctor) {
      this.dispoService.getDisponibilidadDoctor(this.doctor.id).subscribe(
        (disponibilidad: Disponibilidad) => {
          this.disponibilidad = disponibilidad;
        },
        (error) => {
          console.error('Error al obtener la disponibilidad del doctor', error);
    });
    }

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
    }
  }

  navigateToNewAppointment(doctorId: number) {
    if (this.usuario.id) {
      this.citaService.getCitasUsuarioDoctorEstado(this.usuario.id, doctorId, 'pendiente').subscribe(
        (citas) => {
          if (citas.length > 0) {
            this.citapendiente = citas[0];
            const citaFechaHora = new Date(this.citapendiente.fecha);
            citaFechaHora.setHours(citaFechaHora.getHours() - 1);
            this.citapendiente.fecha = citaFechaHora.toISOString();
            this.showModal = true;
          } else {
            this.router.navigate(['/nuevaCita', doctorId]);
          }
        },
        (error) => {
          console.error('Error al obtener las citas del usuario con el doctor', error);
        }
      );
    } else {
      this.router.navigate(['/nuevaCita', doctorId]);
    }
  }

  obtenerHoraMinutos(hora: string): string {
    return hora.substring(0, 5);
  }

  closeModal() {
    this.showModal = false;
  }
}
