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
  @Input() doctor!: Doctor;
  showModal = false;

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
