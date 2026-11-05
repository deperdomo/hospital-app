import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { FooterConmponent } from "../../footer/footer.component";
import { CitaService } from '../../services/cita.service';
import { RecetaService } from '../../services/receta.service';
import { Doctor } from '../../models/doctor';
import { Cita } from '../../models/cita';
import { CitaComponent } from '../../sections/lista-citas/cita/cita.component';
import { DetalleCitaComponent } from '../../sections/lista-citas/cita/detalle-cita/detalle-cita.component';
import { EstadoBadgeComponent } from '../../sections/lista-citas/estado-badge/estado-badge.component';

const MEDIA_HORA = 30 * 60 * 1000;
const DIA = 24 * 60 * 60 * 1000;

/**
 * «Agenda de hoy» del doctor. Una sola petición (citasDoctor) que se reparte en el cliente:
 * citas de hoy por hora, próximas citas de los días siguientes y contadores.
 * La API guarda la hora local como si fuera UTC (ver fecha-cita.ts), así que «ahora» y «hoy»
 * se calculan con la hora de reloj local expresada en UTC y las plantillas formatean con 'UTC'.
 */
@Component({
  selector: 'app-index-doctores',
  imports: [LeftNavComponent, SecundaryNavComponent, FooterConmponent, DatePipe, RouterLink, CitaComponent, DetalleCitaComponent, EstadoBadgeComponent],
  templateUrl: './index-doctores.component.html',
  styleUrl: './index-doctores.component.css',
  providers: [CitaService]
})
export class IndexDoctoresComponent implements OnInit {
  doctor: Doctor = {} as Doctor;
  cargando = true;
  error = false;
  citasHoy: Cita[] = [];
  proximas: Cita[] = [];
  pendientesSemana = 0;
  /** Notificaciones sin leer (null mientras carga o si falla). Solo se consultan: no se marcan como vistas. */
  notificaciones: number | null = null;
  /** true/false según la cita terminada de hoy tenga ya receta; undefined mientras se comprueba. */
  conReceta: Record<number, boolean> = {};
  citaDetalle: Cita | null = null;

  /** Reloj local expresado como UTC (mismo criterio que las fechas guardadas). */
  private readonly ahora = Date.now() - new Date().getTimezoneOffset() * 60000;
  readonly hoy = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  constructor(private citaService: CitaService, private recetaService: RecetaService) {}

  ngOnInit() {
    this.doctor = JSON.parse(localStorage.getItem('doctor') || '{}');
    if (!this.doctor.id) {
      this.cargando = false;
      return;
    }
    this.citaService.getCitasDoctor(String(this.doctor.id)).subscribe({
      next: citas => this.repartir(citas),
      error: () => { this.error = true; this.cargando = false; },
    });
    this.citaService.getCitasNoVistasPorDoctor(this.doctor.id).subscribe({
      next: citas => this.notificaciones = citas.length,
      error: () => this.notificaciones = null,
    });
  }

  private repartir(citas: Cita[]) {
    const hoyKey = dia(this.ahora);
    // Fin de la semana (domingo) del día de hoy.
    const dow = new Date(this.ahora).getUTCDay();
    const domingoKey = dia(this.ahora + ((7 - dow) % 7) * DIA);
    const porHora = (a: Cita, b: Cita) => t(a) - t(b);

    // Igual que app-lista-citas: las pendientes cuya media hora ya pasó se marcan como terminadas.
    for (const cita of citas) {
      if (cita.estado === 'pendiente' && t(cita) + MEDIA_HORA <= this.ahora) {
        cita.estado = 'terminada';
        this.citaService.actualizarCita(cita).subscribe({
          error: err => console.error(`Error actualizando cita ${cita.id}:`, err),
        });
      }
    }

    this.citasHoy = citas.filter(c => dia(t(c)) === hoyKey).sort(porHora);
    const pendientes = citas.filter(c => c.estado === 'pendiente').sort(porHora);
    this.proximas = pendientes.filter(c => dia(t(c)) > hoyKey).slice(0, 5);
    this.pendientesSemana = pendientes.filter(c => dia(t(c)) >= hoyKey && dia(t(c)) <= domingoKey).length;

    for (const cita of this.citasHoy.filter(c => c.estado === 'terminada')) {
      this.recetaService.obtenerCitaReceta(String(cita.id)).subscribe({
        next: tiene => this.conReceta[cita.id] = tiene,
        error: () => delete this.conReceta[cita.id],
      });
    }
    this.cargando = false;
  }

  /** La cita se está atendiendo ahora (pendiente y dentro de su media hora). */
  enCurso(cita: Cita): boolean {
    return cita.estado === 'pendiente' && t(cita) <= this.ahora && this.ahora < t(cita) + MEDIA_HORA;
  }

  abrirDetalle(cita: Cita) {
    document.body.classList.add('overflow-hidden');
    this.citaDetalle = cita;
  }

  cerrarDetalle() {
    this.citaDetalle = null;
    document.body.classList.remove('overflow-hidden');
  }
}

function t(cita: Cita): number {
  return new Date(cita.fecha).getTime();
}

/** "2026-11-05" de un instante, leído en UTC. */
function dia(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}
