import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';



@Component({
  selector: 'app-registro',
  imports: [ CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['../login/login.component.css', './registro.component.css'],
  providers: [UsuarioService]
})
export class RegistroComponent {
  usuario: Usuario;
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = {
      id: 0,
      nombre: 'Juan',
      username: 'juan123',
      apellidos: 'Pérez',
      email: 'juan@example.com',
      telefono: '123456789',
      provincia: 'Madrid',
      localidad: 'Centro',
      direccion: 'Calle Falsa 123',
      fechaAlta: '1990-01-01',
      fechaNacimiento: '1990-01-01',
      fotoPerfil: 'usu_anonimo.png',
      password: 'password123',
      rol: 'paciente'
    };
  }

  onSubmit() {
    this.usuarioService.altaUsuario(this.usuario).subscribe(
      (usuario: Usuario) => {
        console.log('Usuario registrado:', usuario);
        // Guardar el usuario en el localStorage y redirigir a otra ruta:
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate(['/index']);
      },
      error => {
        console.error('Error en el registro', error);
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
