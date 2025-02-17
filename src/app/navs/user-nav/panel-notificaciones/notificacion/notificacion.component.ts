import { Component, Input } from '@angular/core';
import { CitaService } from '../../../../services/cita.service';
import { Cita } from '../../../../models/cita';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificacion',
  imports: [CommonModule],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css'],
  providers: [CitaService]
})
export class NotificacionComponent {

  @Input() cita!: Cita;

  constructor(private citaService: CitaService) { }

  ngOnInit() {
    if (this.cita.id) {
      this.citaService.marcarCitaComoVista(this.cita.id).subscribe(
        (cita: Cita) => {
          console.log('Cita marcada como vista', cita);
          
        },
        error => {
          console.error('Error al marcar la cita como vista', error);
        }
      );
    }
  }
}
