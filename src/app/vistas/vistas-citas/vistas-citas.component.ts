import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { LeftNavComponent } from "../../navs/left-nav/left-nav.component";
import { SecundaryNavComponent } from "../../navs/secundary-nav/secundary-nav.component";
import { ListaCitasComponent } from "../../sections/lista-citas/lista-citas.component";
import { NavCitasComponent } from "../../navs/citas-nav/citas-nav.component";
import { Usuario } from '../../models/usuario';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-vistas-citas',
  imports: [LeftNavComponent, SecundaryNavComponent, ListaCitasComponent, NavCitasComponent],
  templateUrl: './vistas-citas.component.html',
  styleUrl: './vistas-citas.component.css'
})

export class IndexVistasCitasComponent implements OnInit {
  usuario: Usuario | undefined;
  doctor: Doctor | undefined;
  selectedMonth: number = new Date().getMonth();

  @ViewChild(ListaCitasComponent) listaCitasComponent!: ListaCitasComponent;
  @ViewChild(NavCitasComponent) navCitasComponent!: NavCitasComponent;

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');

    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }

    if (doctorGuardado) {
      this.doctor = JSON.parse(doctorGuardado);
    }
  }

  onMonthSelected(month: number) {
    this.selectedMonth = month;
    this.listaCitasComponent.selectedMonth = month;
    if(this.usuario){
      this.listaCitasComponent.cargarCitasActivasUsuario();
    }else if (this.doctor){
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
}
