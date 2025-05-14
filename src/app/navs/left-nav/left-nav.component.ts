import { Component, Input, HostListener } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { AyudaComponent } from "./ayuda/ayuda.component";
import { DisponibilidadService } from '../../services/disponibilidad.service';
import { FormDisponibilidadComponent } from "../user-nav/form-disponibilidad/form-disponibilidad.component";
import { NewDoctorComponent } from "../user-nav/new-doctor/new-doctor.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-left-nav',
  imports: [CommonModule, HttpClientModule, AyudaComponent, FormDisponibilidadComponent, NewDoctorComponent],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css',
  providers: [UsuarioService, DoctorService, DisponibilidadService]
})
export class LeftNavComponent {

  mobileMenuOpen = false;

  usuario: Usuario;
  doctor: Doctor;
  selected: boolean = false;
  isOpen: boolean = false;
  isDoctor: boolean = false;
  isUsuario: boolean = false;
  isFormularioDisponibilidadActivo: boolean = false;
  isFormularioNewDoctorActivo: boolean = false;

  @Input() panel!: boolean;
  @Input() perfil!: boolean;
  @Input() citas!: boolean;
  @Input() horario!: boolean;

  svg = {
    logo: 'M6.65141 5.5695C6.65141 4.30473 7.15384 3.09175 8.04817 2.19742C8.9425 1.30309 10.1555 0.800659 11.4203 0.800659C12.685 0.800659 13.898 1.30309 14.7923 2.19742C15.6867 3.09175 16.1891 4.30473 16.1891 5.5695C16.1891 6.83428 15.6867 8.04726 14.7923 8.94159C13.898 9.83592 12.685 10.3384 11.4203 10.3384C10.1555 10.3384 8.9425 9.83592 8.04817 8.94159C7.15384 8.04726 6.65141 6.83428 6.65141 5.5695ZM2.03912 13.3809C3.00988 12.4594 4.29733 11.9456 5.63584 11.9456C6.97435 11.9456 8.2618 12.4594 9.23256 13.3809L9.25316 13.4015L11.4203 15.5686L13.5894 13.4015L13.61 13.3809C14.5806 12.4606 15.8671 11.9476 17.2047 11.9476C18.5422 11.9476 19.8288 12.4606 20.7993 13.3809C21.2814 13.8381 21.6654 14.3886 21.9281 14.9989C22.1907 15.6092 22.3264 16.2666 22.327 16.931C22.3276 17.5954 22.193 18.253 21.9314 18.8638C21.6699 19.4745 21.2868 20.0257 20.8055 20.4837L12.1371 28.909C11.9449 29.0959 11.6873 29.2004 11.4192 29.2004C11.1511 29.2004 10.8936 29.0959 10.7013 28.909L2.035 20.4837C1.5539 20.0259 1.17094 19.4749 0.909391 18.8644C0.647841 18.2539 0.513165 17.5966 0.513551 16.9325C0.513936 16.2683 0.649374 15.6112 0.911633 15.001C1.17389 14.3908 1.55749 13.8383 2.03912 13.3809Z',
    panelDeControl: 'M6.625 2.75a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75m10.75 0a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75M6.625 13.5a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75m10.75 0a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75',
    newDoctor1: 'M7.007 12a.75.75 0 0 1 .75-.75h3.493V7.757a.75.75 0 0 1 1.5 0v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1-.75-.75',
    newDoctor2: 'M7.317 3.769a42.5 42.5 0 0 1 9.366 0c1.827.204 3.302 1.643 3.516 3.48c.37 3.157.37 6.346 0 9.503c-.215 1.837-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.643-3.516-3.48a41 41 0 0 1 0-9.503c.214-1.837 1.69-3.276 3.516-3.48m9.2 1.49a41 41 0 0 0-9.034 0A2.486 2.486 0 0 0 5.29 7.424a39.4 39.4 0 0 0 0 9.154a2.486 2.486 0 0 0 2.193 2.164c2.977.332 6.057.332 9.034 0a2.486 2.486 0 0 0 2.192-2.164a39.4 39.4 0 0 0 0-9.154a2.486 2.486 0 0 0-2.192-2.163',
    disponibilidad1: 'M7.007 12a.75.75 0 0 1 .75-.75h3.493V7.757a.75.75 0 0 1 1.5 0v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1-.75-.75',
    disponibilidad2: 'M7.317 3.769a42.5 42.5 0 0 1 9.366 0c1.827.204 3.302 1.643 3.516 3.48c.37 3.157.37 6.346 0 9.503c-.215 1.837-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.643-3.516-3.48a41 41 0 0 1 0-9.503c.214-1.837 1.69-3.276 3.516-3.48m9.2 1.49a41 41 0 0 0-9.034 0A2.486 2.486 0 0 0 5.29 7.424a39.4 39.4 0 0 0 0 9.154a2.486 2.486 0 0 0 2.193 2.164c2.977.332 6.057.332 9.034 0a2.486 2.486 0 0 0 2.192-2.164a39.4 39.4 0 0 0 0-9.154a2.486 2.486 0 0 0-2.192-2.163',
    horario: 'M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7h16Zm0-9H4V7a1 1 0 0 1 1-1h2v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h2a1 1 0 0 1 1 1Z',
    perfil1: 'M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0',
    perfil2: 'M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21',
    citas1: 'M8.5 14a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m0 3.5a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m4.75-4.75a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12 17.5a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m4.75-4.75a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0',
    citas2: 'M8 3.25a.75.75 0 0 1 .75.75v.75h6.5V4a.75.75 0 0 1 1.5 0v.758q.228.006.425.022c.38.03.736.098 1.073.27a2.75 2.75 0 0 1 1.202 1.202c.172.337.24.693.27 1.073c.03.365.03.81.03 1.345v7.66c0 .535 0 .98-.03 1.345c-.03.38-.098.736-.27 1.073a2.75 2.75 0 0 1-1.201 1.202c-.338.172-.694.24-1.074.27c-.365.03-.81.03-1.344.03H8.17c-.535 0-.98 0-1.345-.03c-.38-.03-.736-.098-1.073-.27a2.75 2.75 0 0 1-1.202-1.2c-.172-.338-.24-.694-.27-1.074c-.03-.365-.03-.81-.03-1.344V8.67c0-.535 0-.98.03-1.345c.03-.38.098-.736.27-1.073A2.75 2.75 0 0 1 5.752 5.05c.337-.172.693-.24 1.073-.27q.197-.016.425-.022V4A.75.75 0 0 1 8 3.25M7.25 6.5v-.242a6 6 0 0 0-.303.017c-.287.023-.424.065-.514.111a1.25 1.25 0 0 0-.547.547c-.046.09-.088.227-.111.514c-.024.296-.025.68-.025 1.253v.55h12.5V8.7c0-.572 0-.957-.025-1.253c-.023-.287-.065-.424-.111-.514a1.25 1.25 0 0 0-.547-.547c-.09-.046-.227-.088-.515-.111a6 6 0 0 0-.302-.017V6.5a.75.75 0 0 1-1.5 0v-.25h-6.5v.25a.75.75 0 0 1-1.5 0m11 3.75H5.75v6.05c0 .572 0 .957.025 1.252c.023.288.065.425.111.515c.12.236.311.427.547.547c.09.046.227.088.514.111c.296.024.68.025 1.253.025h7.6c.572 0 .957 0 1.252-.025c.288-.023.425-.065.515-.111a1.25 1.25 0 0 0 .547-.547c.046-.09.088-.227.111-.515c.024-.295.025-.68.025-1.252z',
    citas3: 'M9.75 7.75A.75.75 0 0 1 10.5 7h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75',
    ayuda: 'M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8',
    logout: 'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z',
    modalAlerta: 'M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z',
  };

  constructor(private disponibilidadService: DisponibilidadService) {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
      this.isUsuario = true;
    } else if (doctorGuardado) {
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;
      this.isDoctor = true;

      this.disponibilidadService.getDisponibilidadDoctor(this.doctor.id).subscribe(
        (disponibilidad) => {
          if (disponibilidad) {
            // Acción cuando hay disponibilidad
          } else {
            this.mostrarModalAlerta(
              'Doctor ' + this.doctor.nombre + ' no tiene disponibilidad actualmente. Para que los usuarios puedan agendar citas, es necesario que defina su disponibilidad. Puede hacerlo seleccionando la opción de disponibilidad en el menú superior.'
            );
          }
        },
        (error) => {
          console.error('Error al consultar disponibilidad:', error);
          this.mostrarModalAlerta('Ocurrió un error al consultar la disponibilidad');
        });

    }
  }

  logout() {
    ['usuario', 'doctor'].forEach(item => localStorage.removeItem(item));
  }

  open() {
    document.body.classList.add('overflow-hidden');
    this.isOpen = true;
  }

  cerrarModal(estado: boolean) {
    this.isOpen = estado;
  }


  abrirFormularioDisponibilidad() {
    this.isFormularioDisponibilidadActivo = true;
    document.body.classList.add('overflow-hidden');
  }

  abrirFormularioNewDoctor() {
    this.isFormularioNewDoctorActivo = true;
    document.body.classList.add('overflow-hidden');
  }

  // Método para mostrar la alerta
  mostrarModalAlerta(mensaje: string) {
    const modal = document.getElementById('alert-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      const mensajeElemento = document.getElementById('alert-message');
      if (mensajeElemento) {
        mensajeElemento.textContent = mensaje;
      }
    }
  }

  cerrarFormularios(valor: boolean) {
    this.isFormularioDisponibilidadActivo = valor;
    this.isFormularioNewDoctorActivo = valor
    document.body.classList.remove('overflow-hidden');
  }

  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    // Optional: prevent body scrolling when menu is open
    if (this.mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  // Close mobile menu on navigation
  closeMenu(): void {
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
      document.body.classList.remove('overflow-hidden');
    }
  }

  // Close mobile menu when screen size changes to desktop
  @HostListener('window:resize')
  checkScreen(): void {
    if (window.innerWidth >= 640) { // sm breakpoint in Tailwind
      this.mobileMenuOpen = false;
      document.body.classList.remove('overflow-hidden');
    }
  }

}
