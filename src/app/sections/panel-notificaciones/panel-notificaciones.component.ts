import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from "./notificacion/notificacion.component";

@Component({
  selector: 'app-panel-notificaciones',
  imports: [NotificacionComponent, CommonModule],
  templateUrl: './panel-notificaciones.component.html',
  styleUrl: './panel-notificaciones.component.css'
})
export class PanelNotificacionesComponent {

  mostrarModal: boolean = false;

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

}
