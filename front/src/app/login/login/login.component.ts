import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [ CommonModule, FormsModule ],
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
    const tipo = this.isDoctor ? 'doctor' : 'paciente';
    this.authService.login(this.username, this.password, tipo).subscribe({
      next: ({ token, perfil }) => {
        // mismas claves que antes para no romper los componentes
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem(this.isDoctor ? 'doctor' : 'usuario', JSON.stringify(perfil));
        this.router.navigate([this.isDoctor ? '/indexDoctores' : '/index']);
      },
      error: (err) => {
        this.errorMessage = err.status === 401
          ? 'Credenciales incorrectas. Por favor, inténtalo de nuevo.'
          : 'No se pudo iniciar sesión. Inténtalo más tarde.';
      }
    });
  }
}
