import { Component, EventEmitter, Output } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-nav',
  imports: [FormsModule],
  templateUrl: './find-nav.component.html',
  styleUrls: ['./find-nav.component.css'],
  providers: [DoctorService]
})
export class FindNavComponent {
  nombreApellido: string = '';
  especialidad: string = '';
  localidad: string = '';
  doctores: Doctor[] = [];

  @Output() doctoresEncontrados = new EventEmitter<Doctor[]>();

  constructor(private doctorService: DoctorService) {}

  buscarDoctores() {
    let nombre = '';
    let apellido = '';

    if (this.nombreApellido.trim()) {
      const partes = this.nombreApellido.split(' ');
      nombre = partes[0] || '';
      apellido = partes[1] || '';
    }

    this.doctorService.buscarPorNombreApellidoLocalidadYEspecialidad(nombre || 'xxx', apellido || 'xxx', this.localidad || 'xxx', this.especialidad || 'xxx')
      .subscribe((doctores) => {
        this.doctores = doctores;
        this.doctoresEncontrados.emit(doctores);
        console.log(doctores);
        this.limpiar();
      });
  }

  limpiar() {
    this.nombreApellido = '';
    this.especialidad = '';
    this.localidad = '';
  }
}
