import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from "./notificacion/notificacion.component";
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita';
import { DialogDirective } from '../../../shared/dialog.directive';

@Component({
  selector: 'app-panel-notificaciones',
  imports: [NotificacionComponent, CommonModule, RouterModule, DialogDirective],
  templateUrl: './panel-notificaciones.component.html',
  styleUrl: './panel-notificaciones.component.css'
})
export class PanelNotificacionesComponent {
  mostrarModal: boolean = true;
  quitarNotificaciones: boolean = false;
  usuario: Usuario;
  /** Id del doctor si la sesión es de doctor (sus notificaciones son las reservas nuevas). */
  idDoctor: number | null = null;
  citasNoVistas: Cita[] = [];
  /** Solo la primera carga muestra «Cargando…»; al cerrar se vuelve a pedir sin parpadeo. */
  cargando = true;

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
    const doctorGuardado = localStorage.getItem('doctor');
    if (!usuarioGuardado && doctorGuardado) {
      this.idDoctor = JSON.parse(doctorGuardado).id ?? null;
    }
    this.getNotificaciones();


  }

  getNotificaciones() {
    const citas$ = this.usuario.id
      ? this.citaService.getCitasNoVistasPorUsuario(this.usuario.id)
      : this.idDoctor ? this.citaService.getCitasNoVistasPorDoctor(this.idDoctor) : null;
    if (citas$) {
      citas$.subscribe(
        (citas: Cita[]) => {
          this.citasNoVistas = citas;
          this.cargando = false;
        },
        error => {
          console.error('Error al obtener las citas no vistas', error);
          this.cargando = false;
        }
      );
    } else {
      this.cargando = false;
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    document.body.classList.remove('overflow-hidden');
    this.modalCerrado.emit(this.mostrarModal);
  }

  /** Quita la notificación marcada con el check; sin pendientes, se apaga el aviso de la campana. */
  quitarLeida(cita: Cita) {
    this.citasNoVistas = this.citasNoVistas.filter(c => c !== cita);
    if (this.citasNoVistas.length === 0) {
      this.quitarNotificaciones = true;
      this.notificaciones.emit(this.quitarNotificaciones);
    }
  }

}
