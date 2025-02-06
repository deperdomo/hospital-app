import { Component } from '@angular/core';

@Component({
  selector: 'app-user-nav',
  imports: [],
  templateUrl: './user-nav.component.html',
})
export class UserNavComponent {

  nombreUsuario: string = '';
  fotoPerfil: string = '';

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.nombreUsuario = usuario.nombre;
      this.fotoPerfil = usuario.fotoPerfil;
    }
  }

}
