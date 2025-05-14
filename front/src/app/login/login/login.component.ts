import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../models/doctor';


@Component({
  selector: 'app-login',
  imports: [ CommonModule, FormsModule, HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isDoctor: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.isDoctor) {
      this.loginDoctor();
    } else {
      this.loginUsuario();
    }
  }


  loginUsuario() {
    this.authService.getUserByUsername(this.username).subscribe(
      (usuario: Usuario) => {
        console.log('isDoctor:', this.isDoctor);
        if (usuario.password == this.password) {
          console.log('Usuario autenticado:', usuario);
          // Guardar el usuario en el localStorage y redirigir a /index:
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.router.navigate(['/index']);
        } else {
          this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
          console.log('Contraseña incorrecta');
        }
      },
      error => {
        console.error('Error en el login', error);
        this.errorMessage = 'El usuario no existe. Por favor, regístrate.';
      }
    );
  }

  loginDoctor() {
    this.authService.getDoctorByUsername(this.username).subscribe(
      (doctor: Doctor) => {
        console.log('isDoctor:', this.isDoctor);
        if (doctor.password == this.password) {
          console.log('Doctor autenticado:', doctor);
          // Guardar el doctor en el localStorage y redirigir a /index:
          localStorage.setItem('doctor', JSON.stringify(doctor));
          this.router.navigate(['/indexDoctores']);
        } else {
          this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
          console.log('Contraseña incorrecta');
        }
      },
      error => {
        console.error('Error en el login', error);
        this.errorMessage = 'El doctor no existe. Por favor, regístrate.';
      }
    );
  }
}
