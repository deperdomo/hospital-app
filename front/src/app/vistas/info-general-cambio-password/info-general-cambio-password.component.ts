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
  enviado = false;
  repetidaTocada = false;
  errorMessage = '';
  
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
  /** Solo se avisa cuando el usuario ya ha escrito la repetición (o ha enviado). */
  mostrarNoCoinciden(): boolean {
    return (this.enviado || this.repetidaTocada) && this.antiguaPassword !== this.repetirAntiguaPassword;
  }

  /** Solo se avisa cuando hay una nueva contraseña escrita, nunca al cargar la página. */
  mostrarIgual(): boolean {
    return !!this.nuevaPassword && this.nuevaPassword === this.antiguaPassword;
  }

  compararPassword(){
    this.enviado = true;
    this.errorMessage = '';
    if (!this.antiguaPassword || !this.repetirAntiguaPassword || !this.nuevaPassword) {
      this.errorMessage = 'Rellena todos los campos.';
      return;
    }
    // Los avisos de estos dos casos ya se muestran (y anuncian) junto a su campo.
    if (this.mostrarNoCoinciden()) {
      document.getElementById('repeatPassword')?.focus();
      return;
    }
    if (this.mostrarIgual()) {
      document.getElementById('nuevaPassword')?.focus();
      return;
    }
    const peticion: Observable<unknown> = this.usuarios
      ? this.usuarioService.editarPassword(String(this.usuario.id), this.antiguaPassword, this.nuevaPassword)
      : this.doctorService.editarPassword(String(this.doctor.id), this.antiguaPassword, this.nuevaPassword);
    peticion.subscribe({
      next: () => this.redirigirPaginaPerfil(),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = typeof err.error === 'string' ? err.error : 'No se pudo cambiar la contraseña.';
      },
    });
  }
}
