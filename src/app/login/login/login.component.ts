import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.getUserByUsername(this.username).subscribe(
      (usuario: Usuario) => {
        if (usuario.password == this.password) {
          console.log('Usuario autenticado:', usuario);
          // Por ejemplo, guardar el usuario en el localStorage o redirigir a otra ruta:
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.router.navigate(['/']);
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
}
