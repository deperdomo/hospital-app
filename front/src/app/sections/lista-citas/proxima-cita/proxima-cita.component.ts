import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { DetalleCitaComponent } from '../cita/detalle-cita/detalle-cita.component';
import { EstadoBadgeComponent } from '../estado-badge/estado-badge.component';
import { partesFecha, PartesFecha, sumarMediaHora } from '../fecha-cita';

/**
 * «Tu próxima cita» en el inicio del paciente. Recibe la cita ya cargada por app-lista-citas
 * (no hace otra petición). Cancelar y Ver detalle siguen el mismo flujo que app-cita.
 */
@Component({
  selector: 'app-proxima-cita',
  imports: [DatePipe, RouterLink, DetalleCitaComponent, EstadoBadgeComponent],
  templateUrl: './proxima-cita.component.html',
  providers: [CitaService],
})
export class ProximaCitaComponent {
  @Input() cita: Cita | null = null;
  @Input() cargando = true;

  isModalDetalleCitaActivo = false;
  cancelando = false;

  constructor(private citaService: CitaService) {}

  get fecha(): PartesFecha | null {
    return this.cita ? partesFecha(this.cita.fecha) : null;
  }

  sumarMediaHora(fecha: string): Date {
    return sumarMediaHora(fecha);
  }

  cancelarCita(id: number) {
    this.cancelando = true;
    this.citaService.cancelarCita(id).subscribe({
      next: () => window.location.reload(),
      error: () => window.location.reload(),
    });
  }

  abrirModal() {
    document.body.classList.add('overflow-hidden');
    this.isModalDetalleCitaActivo = true;
  }

  cerrarModal() {
    this.isModalDetalleCitaActivo = false;
    document.body.classList.remove('overflow-hidden');
  }
}
