import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-nearby-doctors-disabled',
  imports: [],
  templateUrl: './nearby-doctors-disabled.component.html',
  providers: [DoctorService],
})
export class NearbyDoctorsDisabledComponent {
  @Output() habilitarNerbyDoctors = new EventEmitter<void>();
  @Output() doctoresCercanos: EventEmitter<Doctor[]> = new EventEmitter<Doctor[]>();
  @Input() texto!: string;

  constructor(private doctorService: DoctorService) {}

  cambiarEstado() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.doctorService.buscarPorLocalidad(usuario.localidad).subscribe(
        (doctores) => {
          console.log('Doctores:', doctores);
          this.doctoresCercanos.emit(doctores);
      });
    }


    this.habilitarNerbyDoctors.emit(); // Emitimos al padre

  }
}
