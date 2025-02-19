import { Component } from '@angular/core';
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { ListaDoctoresComponent } from "../../sections/lista-doctores/lista-doctores.component";

@Component({
  selector: 'app-doctores',
  imports: [LeftNavComponent, SecundaryNavComponent, ListaDoctoresComponent],
  templateUrl: './doctores.component.html',
  styleUrl: './doctores.component.css'
})
export class DoctoresComponent {
  usuarioLogeado: boolean = false;

  ngOnInit(): void {
    this.usuarioLogeado = this.checkUsuarioEnLocalStorage();
  }

  checkUsuarioEnLocalStorage(): boolean {
    return localStorage.getItem('usuario') !== null;
  }
}
