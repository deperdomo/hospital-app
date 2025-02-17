import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from "./notificacion/notificacion.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel-notificaciones',
  imports: [NotificacionComponent, CommonModule, RouterModule],
  templateUrl: './panel-notificaciones.component.html',
  styleUrl: './panel-notificaciones.component.css'
})
export class PanelNotificacionesComponent {
  mostrarModal: boolean = true;

  @Output() modalCerrado = new EventEmitter<boolean>();

  cerrarModal() {
    this.mostrarModal = false;
    this.modalCerrado.emit(this.mostrarModal);
  }
  

}
