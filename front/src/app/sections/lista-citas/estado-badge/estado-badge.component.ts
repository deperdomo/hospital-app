import { Component, Input } from '@angular/core';

/**
 * Estado de una cita como badge: siempre texto + icono, nunca solo color.
 * Las clases van escritas enteras (sin concatenar) para que Tailwind no las purgue.
 */
@Component({
  selector: 'app-estado-badge',
  template: `
    @switch (estado) {
      @case ('terminada') {
        <span class="badge-terminada">
          <svg class="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
          Terminada
        </span>
      }
      @case ('cancelada') {
        <span class="badge-cancelada">
          <svg class="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          Cancelada
        </span>
      }
      @default {
        <span class="badge-pendiente">
          <svg class="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Pendiente
        </span>
      }
    }
  `,
})
export class EstadoBadgeComponent {
  @Input() estado = 'pendiente';
}
