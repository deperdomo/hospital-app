import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../models/doctor';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorService } from '../../services/doctor.service';
//import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-info-general-cambio-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './info-general-cambio-password.component.html',
  styleUrl: './info-general-cambio-password.component.css',
  providers: [UsuarioService,DoctorService]
})
export class InfoGeneralCambioPasswordComponent {
  usuario: Usuario;
  repetirAntiguaPassword :string=''; //esta es la repeticion de la password
  antiguaPassword:string=''; //esta es la password antigua
  
  nuevaPassword:string='';//esta seria para la password actual

  doctor: Doctor;
  usuarios: boolean=false;
  
  constructor(private router: Router, private usuarioService: UsuarioService, private doctorService: DoctorService){
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
  }
  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      this.usuarios=true;
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
    }
    else if (doctorGuardado) {
      this.usuarios = false
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;
     }
  }

  redirigirPaginaPerfil(){
    this.router.navigate(['/perfil']);
  }
  // la contraseña actual se verifica en el servidor
  compararPassword(){
    if (this.antiguaPassword !== this.repetirAntiguaPassword) {
      alert('Las contraseñas actuales no coinciden');
      return;
    }
    if (!this.nuevaPassword || this.nuevaPassword === this.antiguaPassword) {
      alert('La nueva contraseña debe ser distinta de la actual');
      return;
    }
    const peticion: Observable<unknown> = this.usuarios
      ? this.usuarioService.editarPassword(String(this.usuario.id), this.antiguaPassword, this.nuevaPassword)
      : this.doctorService.editarPassword(String(this.doctor.id), this.antiguaPassword, this.nuevaPassword);
    peticion.subscribe({
      next: () => this.redirigirPaginaPerfil(),
      error: (err: HttpErrorResponse) => alert(typeof err.error === 'string' ? err.error : 'No se pudo cambiar la contraseña'),
    });
  }
}
