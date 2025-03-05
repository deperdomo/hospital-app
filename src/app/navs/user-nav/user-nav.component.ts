import { Component } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { Cita } from '../../models/cita';
import { RouterModule } from '@angular/router';
import { PanelNotificacionesComponent } from './panel-notificaciones/panel-notificaciones.component';
import { Doctor } from '../../models/doctor';
import { NewDoctorComponent } from "./new-doctor/new-doctor.component";



@Component({
  selector: 'app-user-nav',
  imports: [HttpClientModule, RouterModule, PanelNotificacionesComponent, NewDoctorComponent],
  templateUrl: './user-nav.component.html',
  providers: [CitaService]
})
export class UserNavComponent {
  usuario: Usuario;
  doctor: Doctor;
  hayCitasNoVistas: boolean = false;
  isModalNotificacionesActive: boolean = false;
  isFormularioActivo: boolean = false;

  nombre: string = "";
  urlFotoPerfil: string = "";
  
  constructor(private citaService: CitaService) {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
      this.urlFotoPerfil = 'img/usuarios/' + this.usuario?.fotoPerfil || 'Foto de Perfil no definida';
    }
    if (doctorGuardado) {
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;
      this.urlFotoPerfil = 'img/doctores/' + this.doctor?.fotoPerfil || 'Foto de Perfil no definida';
    }

    this.nombre = this.usuario?.nombre || this.doctor?.nombre || 'Nombre no definido';
    

    this.comprobarNotificaciones()

  }

  abrirModal() {
    document.body.classList.add('overflow-hidden');
    this.isModalNotificacionesActive = true;
  }

  cerrarModal(valor: boolean) {
    this.isModalNotificacionesActive = valor;
  }

  cerrarFormulario(valor: boolean) {
    this.isFormularioActivo = valor;
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

  abrirFormulario() {
    this.isFormularioActivo = true;
    document.body.classList.add('overflow-hidden');
  }

}
