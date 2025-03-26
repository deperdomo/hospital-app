import { Component, HostListener, OnInit } from '@angular/core';
import { HistorialComponent } from "../../sections/historial/historial.component";
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { PerfilNavComponent } from "../../navs/perfil-nav/perfil-nav.component";
import { CommonModule } from '@angular/common'; // Asegúrate de que esto esté importado


@Component({
  selector: 'app-perfil-historial',
  imports: [HistorialComponent, LeftNavComponent, SecundaryNavComponent, PerfilNavComponent, CommonModule],
  templateUrl: './perfil-historial.component.html',
  styleUrl: './perfil-historial.component.css'
})
export class PerfilHistorialComponent implements OnInit {
  isLeftNavOpen: boolean = false;
  isMobile: boolean = false;

  ngOnInit() {
    this.checkWindowSize(); 
  }

  // Método para alternar la visibilidad del Left-Nav
  toggleLeftNav() {
    this.isLeftNavOpen = !this.isLeftNavOpen; // Cambia el estado de apertura
    
  }

  @HostListener('window:resize', ['$event']) // Recalcula el tamaño cuando se redimensione la ventana
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    // Verifica si el ancho de la ventana es menor o igual a 768px (para móviles)
    this.isMobile = window.innerWidth <= 1000;
  }
}
