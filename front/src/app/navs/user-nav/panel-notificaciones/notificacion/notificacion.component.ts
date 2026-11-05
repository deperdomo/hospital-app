import { Component, Input } from '@angular/core';
import { CitaService } from '../../../../services/cita.service';
import { Cita } from '../../../../models/cita';
import { CommonModule } from '@angular/common';
import { partesFecha } from '../../../../sections/lista-citas/fecha-cita';

@Component({
  selector: 'app-notificacion',
  imports: [CommonModule],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css'],
  providers: [CitaService]
})
export class NotificacionComponent {

  @Input() cita!: Cita;
  /** true: notificación de un doctor (muestra al paciente y marca visto_doctor). */
  @Input() paraDoctor = false;

  constructor(private citaService: CitaService) { }

  /** «jueves, 5 de noviembre de 2026», en UTC como el resto de fechas de citas. */
  get fechaLarga(): string {
    return partesFecha(this.cita.fecha).larga;
  }

  ngOnInit() {
    if (this.cita.id) {
      const marcar$ = this.paraDoctor
        ? this.citaService.marcarCitaComoVistaDoctor(this.cita.id)
        : this.citaService.marcarCitaComoVista(this.cita.id);
      marcar$.subscribe(
        (cita: Cita) => {
        },
        error => {
          console.error('Error al marcar la cita como vista', error);
        }
      );
    }
  }
}
