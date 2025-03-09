import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterConmponent {
usuario: Usuario;
constructor(){
    this.usuario = {} as Usuario;
  }
  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
    }
  }
}