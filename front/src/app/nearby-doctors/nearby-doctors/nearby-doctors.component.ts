import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Cita } from '../../models/cita';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nearby-doctors',
  imports: [CommonModule],
  templateUrl: './nearby-doctors.component.html',
  styleUrls: ['./nearby-doctors.component.css'],
})
export class NearbyDoctorsComponent {
  edad: number = 0;

  svg = {
    direccion: 'M12 2c-4.4 0-8 3.6-8 8c0 5.4 7 11.5 7.3 11.8c.2.1.5.2.7.2s.5-.1.7-.2C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8m0 17.7c-2.1-2-6-6.3-6-9.7c0-3.3 2.7-6 6-6s6 2.7 6 6s-3.9 7.7-6 9.7M12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2',
    sexo: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    nacimiento: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z',
    hora: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    ubicacion1: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
    ubicacion2: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    guardar: 'M12 4v16m8-8H4'
  }

  @Input() doctor!: Doctor;
  @Input() cita!: Cita;

  constructor(private router: Router) {}

  navigateToNewAppointment() {
    const doctorId = this.doctor.id;
    this.router.navigate(['/nuevaCita', doctorId]);
  }

  navigateToNewReceta() {
    // se añadio cita a la url
    const usuarioId = this.cita.usuario.id;
    const idCita = this.cita.id;
    this.router.navigate(['/nuevaReceta', usuarioId,idCita]);
  }

  calcularEdad(fechaNacimiento: string): number {
    const añoNacimiento = parseInt(fechaNacimiento.substring(0, 4));
   
    if (isNaN(añoNacimiento)) {
      return 0;
    }
   
    const añoActual = new Date().getFullYear();
    return añoActual - añoNacimiento;
  }
   

}


