import { Component } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { Cita } from '../../models/cita';
import { RouterModule } from '@angular/router';
import { PanelNotificacionesComponent } from './panel-notificaciones/panel-notificaciones.component';



@Component({
  selector: 'app-user-nav',
  imports: [HttpClientModule, RouterModule, PanelNotificacionesComponent],
  templateUrl: './user-nav.component.html',
  providers: [CitaService]
})
export class UserNavComponent {
  usuario: Usuario;
  hayCitasNoVistas: boolean = false;
  isModalNotificacionesActive: boolean = false;

  constructor(private citaService: CitaService) {
    this.usuario = {} as Usuario;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
    }

    this.comprobarNotificaciones()

  }

  abrirModal() {
    this.isModalNotificacionesActive = true;
  }

  cerrarModal(valor: boolean) {
    this.isModalNotificacionesActive = valor;
  }

  comprobarNotificaciones() {
    if (this.usuario.id) {
      this.citaService.getCitasNoVistasPorUsuario(this.usuario.id).subscribe(
        (citas: Cita[]) => {
          //console.log('Citas no vistas: ', citas);
          if (citas.length > 0) {
            this.hayCitasNoVistas = true;
          }
        },
        error => {
          console.error('Error al obtener las citas no vistas', error);
        }
      );
    }
  }

  actualizarNotificaciones(valor: boolean) {
    if (valor) {
      this.hayCitasNoVistas = false;
    }
  }

}
