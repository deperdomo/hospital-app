import { Component, Input } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { AyudaComponent } from "./ayuda/ayuda.component";

@Component({
  selector: 'app-left-nav',
  imports: [HttpClientModule, AyudaComponent],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css', 
  providers: [UsuarioService, DoctorService]
})
export class LeftNavComponent {

  usuario: Usuario;
  doctor: Doctor;
  isDoctorOrAdmin: boolean = false;
  selected: boolean = false;
  isOpen: boolean = false;
  isDoctor: boolean = false;

  @Input() panel!: boolean;
  @Input() perfil!: boolean;
  @Input() citas!: boolean;
  @Input() horario!: boolean;

  constructor () {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
  }

  ngOnInit () {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
      this.isDoctor = false;
    } else if (doctorGuardado) {
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;
      this.isDoctor= true;
    }

    if (this.usuario.rol !== 'paciente' || this.doctor.precioConsulta){
      this.isDoctorOrAdmin = true;
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

}
