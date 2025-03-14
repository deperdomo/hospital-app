import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de que esto esté importado
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { ListaCitasComponent } from "../../sections/lista-citas/lista-citas.component";
import { NavCitasComponent } from "../../navs/citas-nav/citas-nav.component";
import { Usuario } from '../../models/usuario';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-vistas-citas',
  imports: [LeftNavComponent, SecundaryNavComponent, ListaCitasComponent, NavCitasComponent, CommonModule],
  templateUrl: './vistas-citas.component.html',
  styleUrl: './vistas-citas.component.css'
})

export class IndexVistasCitasComponent implements OnInit {
  usuario: Usuario | undefined;
  doctor: Doctor | undefined;
  selectedMonth: number = new Date().getMonth();
  isLeftNavOpen: boolean = false;
  isMobile: boolean = false;


  @ViewChild(ListaCitasComponent) listaCitasComponent!: ListaCitasComponent;
  @ViewChild(NavCitasComponent) navCitasComponent!: NavCitasComponent;


  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');

    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }

    if (doctorGuardado) {
      this.doctor = JSON.parse(doctorGuardado);
    }
    this.checkWindowSize(); 
  }

  onMonthSelected(month: number) {
    this.selectedMonth = month;
    this.listaCitasComponent.selectedMonth = month;
    if (this.usuario) {
      this.listaCitasComponent.cargarCitasActivasUsuario();
    } else if (this.doctor) {
      this.listaCitasComponent.cargarCitasActivasDoctor();
    } else {
      console.error('No se ha encontrado ni usuario ni doctor');
    }

  }

  onCitasCanceladas() {
    this.listaCitasComponent.mostrarCanceladas = true;
    this.listaCitasComponent.mostrarPasadas = false;
    if (this.usuario) {
      this.listaCitasComponent.cargarCitasCanceladasUsuario();
    } else if (this.doctor) {
      this.listaCitasComponent.cargarCitasCanceladasDoctor();

    } else {
      console.error('No se ha encontrado ni usuario ni doctor');
    }

  }

  onCitasProximas() {
    this.listaCitasComponent.mostrarCanceladas = false;
    this.listaCitasComponent.mostrarPasadas = false;
    if (this.usuario) {
      this.listaCitasComponent.cargarCitasActivasUsuario();
    } else if (this.doctor) {
      this.listaCitasComponent.cargarCitasActivasDoctor();

    } else {
      console.error('No se ha encontrado ni usuario ni doctor');
    }

  }

  onCitasPasadas() {
    this.listaCitasComponent.mostrarCanceladas = false;
    this.listaCitasComponent.mostrarPasadas = true;
    if (this.usuario) {
      this.listaCitasComponent.cargarCitasPasadasUsuario();
    } else if (this.doctor) {
      this.listaCitasComponent.cargarCitasPasadasDoctor();

    } else {
      console.error('No se ha encontrado ni usuario ni doctor');
    }

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
    this.isMobile = window.innerWidth <= 1225;
  }

 
}
