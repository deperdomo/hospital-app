import { Component, Input } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { AyudaComponent } from "./ayuda/ayuda.component";
import { DisponibilidadService } from '../../services/disponibilidad.service';
import { FormDisponibilidadComponent } from "../user-nav/form-disponibilidad/form-disponibilidad.component";
import { NewDoctorComponent } from "../user-nav/new-doctor/new-doctor.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-left-nav',
  imports: [CommonModule, HttpClientModule, AyudaComponent, FormDisponibilidadComponent, NewDoctorComponent],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css', 
  providers: [UsuarioService, DoctorService, DisponibilidadService]
})
export class LeftNavComponent {

  usuario: Usuario;
  doctor: Doctor;
  selected: boolean = false;
  isOpen: boolean = false;
  isDoctor: boolean = false;
  isUsuario: boolean = false;
  isFormularioDisponibilidadActivo: boolean = false;
  isFormularioNewDoctorActivo: boolean = false;

  @Input() panel!: boolean;
  @Input() perfil!: boolean;
  @Input() citas!: boolean;
  @Input() horario!: boolean;

  constructor (private disponibilidadService: DisponibilidadService) {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
  }

  ngOnInit () {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
      this.isUsuario = true;
    } else if (doctorGuardado) {
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;
      this.isDoctor= true;

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
  }

  logout() {
    ['usuario', 'doctor'].forEach(item => localStorage.removeItem(item));
  }

  open() {
    document.body.classList.add('overflow-hidden');
    this.isOpen = true;
  }
  
  cerrarModal(estado: boolean) {
    this.isOpen = estado;
  }


  abrirFormularioDisponibilidad() {
    this.isFormularioDisponibilidadActivo = true;
    document.body.classList.add('overflow-hidden');
  }

  abrirFormularioNewDoctor() {
    this.isFormularioNewDoctorActivo = true;
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

  cerrarFormularios(valor: boolean) {
    this.isFormularioDisponibilidadActivo = valor;
    this.isFormularioNewDoctorActivo = valor
    document.body.classList.remove('overflow-hidden');
  }

}
