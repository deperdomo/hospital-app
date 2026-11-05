import { Component, EventEmitter, Output } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';
import { FormsModule } from '@angular/forms';

/**
 * Buscador de doctores con dos campos etiquetados (Especialidad y Localidad).
 * El campo «Doctor» (nombre) se quitó por decisión de producto; /listaDoctores muestra todos los doctores.
 */
@Component({
  selector: 'app-find-nav',
  imports: [FormsModule],
  templateUrl: './find-nav.component.html',
  providers: [DoctorService]
})
export class FindNavComponent {
  especialidad: string = '';
  localidad: string = '';
  doctores: Doctor[] = [];

  svg = {
    buscar: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
    localidad: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
  }

  @Output() doctoresEncontrados = new EventEmitter<Doctor[]>();

  constructor(private doctorService: DoctorService) {}

  buscarDoctores() {
    // La API usa 'xxx' como comodín para los campos vacíos (nombre y apellido siempre vacíos aquí).
    this.doctorService.buscarPorNombreApellidoLocalidadYEspecialidad('xxx', 'xxx', this.localidad.trim() || 'xxx', this.especialidad.trim() || 'xxx')
      .subscribe((doctores) => {
        this.doctores = doctores;
        this.doctoresEncontrados.emit(doctores);
        this.limpiar();
      });
  }

  limpiar() {
    this.especialidad = '';
    this.localidad = '';
  }
}
