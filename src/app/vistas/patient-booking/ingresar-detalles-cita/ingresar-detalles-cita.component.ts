import { Component } from '@angular/core';

@Component({
  selector: 'ingresar-detalles-cita',
  imports: [],
  templateUrl: './ingresar-detalles-cita.component.html',
  styleUrl: './ingresar-detalles-cita.component.css'
})
export class IngresarDetallesCitaComponent {
  email: string = '';
  fotoPerfil: string = '';

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.email = usuario.nombre;
      this.fotoPerfil = usuario.fotoPerfil;
    }
  }
}
