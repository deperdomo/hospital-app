import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from "./notificacion/notificacion.component";
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita';

@Component({
  selector: 'app-panel-notificaciones',
  imports: [NotificacionComponent, CommonModule, RouterModule],
  templateUrl: './panel-notificaciones.component.html',
  styleUrl: './panel-notificaciones.component.css'
})
export class PanelNotificacionesComponent {
  mostrarModal: boolean = true;
  quitarNotificaciones: boolean = false;
  usuario: Usuario;
  citasNoVistas: Cita[] = [];

  @Output() modalCerrado = new EventEmitter<boolean>();
  @Output() notificaciones = new EventEmitter<boolean>();

  constructor(private citaService: CitaService, private router: Router) {
    this.usuario = {} as Usuario;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
    }
    if (this.usuario.id) {
      this.getNotificaciones(this.usuario.id);
    }


  }

  getNotificaciones(id: number) {
    if (this.usuario.id) {
      this.citaService.getCitasNoVistasPorUsuario(this.usuario.id).subscribe(
        (citas: Cita[]) => {
          this.citasNoVistas = citas;
        },
        error => {
          console.error('Error al obtener las citas no vistas', error);
        }
      );
    }
  }

  cerrarModal() {
    if (this.usuario.id) {
      this.getNotificaciones(this.usuario.id);
    }
    this.mostrarModal = false;
    this.quitarNotificaciones = true;
    this.modalCerrado.emit(this.mostrarModal);
    this.notificaciones.emit(this.quitarNotificaciones);
  }

  actualizarNotificaciones() {
    this.quitarNotificaciones = true;
    this.notificaciones.emit(this.quitarNotificaciones);
  }

}
