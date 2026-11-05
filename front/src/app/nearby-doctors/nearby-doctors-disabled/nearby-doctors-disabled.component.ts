import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nearby-doctors-disabled',
  imports: [NgClass, RouterLink],
  templateUrl: './nearby-doctors-disabled.component.html',
  providers: [DoctorService],
})
export class NearbyDoctorsDisabledComponent {
  @Output() habilitarNerbyDoctors = new EventEmitter<void>();
  @Output() doctoresCercanos: EventEmitter<Doctor[]> = new EventEmitter<Doctor[]>();
  @Input() texto!: string;
  /** En columnas estrechas (lateral del inicio) el botón va debajo, a todo el ancho. */
  @Input() apilado = false;
  /** Sin sesión no hay localidad que buscar: se ofrece iniciar sesión. */
  logueado = !!localStorage.getItem('usuario');

  constructor(private doctorService: DoctorService) {}

  cambiarEstado() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.doctorService.buscarPorLocalidad(usuario.localidad).subscribe(
        (doctores) => {
          this.doctoresCercanos.emit(doctores);
      });
    }


    this.habilitarNerbyDoctors.emit(); // Emitimos al padre

  }
}
