import { Component } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { Cita } from '../../models/cita';
import { RouterModule } from '@angular/router';
import { PanelNotificacionesComponent } from './panel-notificaciones/panel-notificaciones.component';
import { Doctor } from '../../models/doctor';
import { NewDoctorComponent } from "./new-doctor/new-doctor.component";
import { FormDisponibilidadComponent } from "./form-disponibilidad/form-disponibilidad.component";
import { DisponibilidadService } from '../../services/disponibilidad.service';



@Component({
  selector: 'app-user-nav',
  imports: [HttpClientModule, RouterModule, PanelNotificacionesComponent, NewDoctorComponent, FormDisponibilidadComponent],
  templateUrl: './user-nav.component.html',
  providers: [CitaService, DisponibilidadService]
})
export class UserNavComponent {
  usuario: Usuario;
  doctor: Doctor;
  isDoctor: boolean = false;
  isUsuario: boolean = false;
  hayCitasNoVistas: boolean = false;
  isModalNotificacionesActive: boolean = false;
  isFormularioActivo: boolean = false;
  isFormularioDisponibilidadActivo: boolean = false;

  nombre: string = "";
  urlFotoPerfil: string = "";
  
  constructor(private citaService: CitaService, private disponibilidadService: DisponibilidadService) {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
      this.isUsuario = true;
      this.urlFotoPerfil = 'img/usuarios/' + this.usuario?.fotoPerfil || 'Foto de Perfil no definida';
    }
    if (doctorGuardado) {
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;
      this.isDoctor = true;
      this.urlFotoPerfil = 'img/doctores/' + this.doctor?.fotoPerfil || 'Foto de Perfil no definida';

      this.disponibilidadService.getDisponibilidadDoctor(this.doctor.id).subscribe(
      (disponibilidad) => {
        if (disponibilidad) {
          // Acción cuando hay disponibilidad
        } else {
          this.mostrarModalAlerta(
            'Doctor ' + this.doctor.nombre + ' no tiene disponibilidad actualmente. Para que los usuarios puedan agendar citas, es necesario que defina su disponibilidad. Puede hacerlo seleccionando la opción de disponibilidad en el menú superior.'
          );
        }
      },
      (error) => {
        console.error('Error al consultar disponibilidad:', error);
        this.mostrarModalAlerta('Ocurrió un error al consultar la disponibilidad');
      });
      
    }

    this.nombre = this.usuario?.nombre || this.doctor?.nombre || 'Nombre no definido';
    

    
  }

  abrirModal() {
    document.body.classList.add('overflow-hidden');
    this.isModalNotificacionesActive = true;
  }

  cerrarModal(valor: boolean) {
    this.isModalNotificacionesActive = valor;
  }

  cerrarFormularios(valor: boolean) {
    this.isFormularioActivo = valor;
    this.isFormularioDisponibilidadActivo = valor;
    document.body.classList.remove('overflow-hidden');
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

  abrirFormularioDisponibilidad() {
    this.isFormularioDisponibilidadActivo = true;
    document.body.classList.add('overflow-hidden');
  }

  // Método para mostrar la alerta
  mostrarModalAlerta(mensaje: string) {
    const modal = document.getElementById('alert-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      const mensajeElemento = document.getElementById('alert-message');
      if (mensajeElemento) {
        mensajeElemento.textContent = mensaje;
      }
    }
  }

}
