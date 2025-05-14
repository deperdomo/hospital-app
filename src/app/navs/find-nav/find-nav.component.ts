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

  svg = {
    doctor : 'm15 15l6 6m-11-4a7 7 0 1 1 0-14a7 7 0 0 1 0 14',
    especialidad: 'M7 12.917v.583a4.5 4.5 0 1 0 9 0v-1.67a3.001 3.001 0 1 1 2 0v1.67a6.5 6.5 0 1 1-13 0v-.583A6 6 0 0 1 0 7V2a2 2 0 0 1 2-2h1a1 1 0 1 1 0 2H2v5a4 4 0 1 0 8 0V2H9a1 1 0 1 1 0-2h1a2 2 0 0 1 2 2v5a6 6 0 0 1-5 5.917M17 10a1 1 0 1 0 0-2a1 1 0 0 0 0 2',
    localidad: 'M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12'
  }

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
