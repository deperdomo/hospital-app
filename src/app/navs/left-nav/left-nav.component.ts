import { Component, Input } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-left-nav',
  imports: [HttpClientModule],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css', 
  providers: [UsuarioService, DoctorService]
})
export class LeftNavComponent {

  usuario: Usuario;
  doctor: Doctor;
  isDoctorOrAdmin: boolean = false;
  selected: boolean = false;
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
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
    }

    if (this.usuario.rol !== 'paciente' || this.doctor.precioConsulta){
      this.isDoctorOrAdmin = true;
    } 
  }

  logout() {
    localStorage.removeItem('usuario');
  }

}
