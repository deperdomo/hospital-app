import { Component } from '@angular/core';
import { HistorialComponent } from "../../sections/historial/historial.component";
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { PerfilNavComponent } from "../../navs/perfil-nav/perfil-nav.component";

@Component({
  selector: 'app-perfil-historial',
  imports: [HistorialComponent, LeftNavComponent, SecundaryNavComponent, PerfilNavComponent],
  templateUrl: './perfil-historial.component.html',
  styleUrl: './perfil-historial.component.css'
})
export class PerfilHistorialComponent {

}
