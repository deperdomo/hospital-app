import { Component, ViewChild } from '@angular/core';
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { ListaCitasComponent } from "../../sections/lista-citas/lista-citas.component";
import { NavCitasComponent } from "../../navs/citas-nav/citas-nav.component";
 
@Component({
  selector: 'app-vistas-citas',
  imports: [LeftNavComponent, SecundaryNavComponent, ListaCitasComponent, NavCitasComponent],
  templateUrl: './vistas-citas.component.html',
  styleUrl: './vistas-citas.component.css'
})
export class IndexVistasCitasComponent{

  @ViewChild(ListaCitasComponent) listaCitasComponent!: ListaCitasComponent;
  @ViewChild(NavCitasComponent) navCitasComponent!: NavCitasComponent;

  onCitasCanceladas() {
    this.listaCitasComponent.mostrarCanceladas = true; 
    this.listaCitasComponent.cargarCitasCanceladasUsuario();
  }

  onCitasProximas() {
    this.listaCitasComponent.mostrarCanceladas = false; 
    this.listaCitasComponent.cargarCitasActivasUsuario();
  }
}
