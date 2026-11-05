import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';



@Component({
  selector: 'app-registro',
  imports: [ CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['../login/login.component.css', './registro.component.css'],
  providers: [UsuarioService]
})
export class RegistroComponent {
  usuario: Usuario;
  errorMessage: string = '';
  errorDuplicado = false;

  constructor(private usuarioService: UsuarioService, private authService: AuthService, private router: Router) {
    this.usuario = {
      id: 0,
      nombre: '',
      username: '',
      apellidos: '',
      email: '',
      telefono: '',
      provincia: '',
      localidad: '',
      direccion: '',
      fechaAlta: new Date().toISOString().slice(0, 10),
      fechaNacimiento: '',
      fotoPerfil: 'usu_anonimo.png',
      password: '',
      rol: 'paciente',
      sexo: 'prefiero_no_decirlo'
    };
  }

  onSubmit() {
    // Alta y, a continuación, login para obtener el token (sin token la API devuelve 401).
    this.usuarioService.altaUsuario(this.usuario).pipe(
      switchMap(() => this.authService.login(this.usuario.username, this.usuario.password, 'paciente'))
    ).subscribe(
      ({ token, perfil }) => {
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(perfil));
        this.router.navigate(['/index']);
      },
      error => {
        console.error('Error en el registro', error);
        this.errorDuplicado = error.status === 409;
        if (error.status === 409) {
          this.errorMessage = 'El correo electrónico o el nombre de usuario ya están en uso.';
        } else if (error.status === 500) {
          this.errorMessage = 'Error en el registro. Por favor, inténtalo de nuevo más tarde.';
        } else {
          this.errorMessage = 'Error desconocido. Por favor, inténtalo de nuevo.';
        }
      }
    );
  }

}
