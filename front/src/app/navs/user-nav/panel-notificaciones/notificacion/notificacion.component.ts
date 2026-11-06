import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() leida = new EventEmitter<void>();
  marcando = false;

  constructor(private citaService: CitaService) { }

  /** «jueves, 5 de noviembre de 2026», en UTC como el resto de fechas de citas. */
  get fechaLarga(): string {
    return partesFecha(this.cita.fecha).larga;
  }

  /** Solo se marca como leída al pulsar el check; abrir o cerrar el panel no la marca. */
  marcarLeida() {
    if (!this.cita.id || this.marcando) return;
    this.marcando = true;
    const marcar$ = this.paraDoctor
      ? this.citaService.marcarCitaComoVistaDoctor(this.cita.id)
      : this.citaService.marcarCitaComoVista(this.cita.id);
    marcar$.subscribe({
      next: () => this.leida.emit(),
      error: error => {
        this.marcando = false;
        console.error('Error al marcar la cita como vista', error);
      }
    });
  }
}
