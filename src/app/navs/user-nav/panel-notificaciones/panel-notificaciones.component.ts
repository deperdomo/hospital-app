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
  usuario: Usuario;
  citasNoVistas: Cita[] = [];

  @Output() modalCerrado = new EventEmitter<boolean>();

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
    this.mostrarModal = false;
    this.modalCerrado.emit(this.mostrarModal);
    window.location.reload();
  }
  
}
