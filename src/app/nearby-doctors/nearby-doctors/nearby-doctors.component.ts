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

  @Input() doctor!: Doctor;
  @Input() cita!: Cita;

  constructor(private router: Router) {}

  navigateToNewAppointment() {
    const doctorId = this.doctor.id;
    this.router.navigate(['/nuevaCita', doctorId]);
  }

  navigateToNewReceta() {
    const usuarioId = this.cita.usuario.id;
    this.router.navigate(['/nuevaReceta', usuarioId]);
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


