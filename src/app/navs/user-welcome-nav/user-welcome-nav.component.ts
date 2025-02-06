import { Component } from '@angular/core';

@Component({
  selector: 'app-user-welcome-nav',
  imports: [],
  templateUrl: './user-welcome-nav.component.html',
})
export class UserWelcomeNavComponent {
  nombreApellido: string = '';


  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.nombreApellido = usuario.nombre + ' ' + usuario.apellidos;
    }
  }
}
