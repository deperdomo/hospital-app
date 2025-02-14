import { Component, Input } from '@angular/core';

@Component({
  selector: 'fecha-cita',
  imports: [],
  templateUrl: './fecha-cita.component.html',
})
export class FechaCitaComponent {
  @Input() selectedDateTime: Date | null = null;

  get formattedDateTime(): string {
    if (!this.selectedDateTime) return "No hay cita seleccionada";

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    };

    return this.selectedDateTime.toLocaleString('es-ES', options);
  }
}
