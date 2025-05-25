import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { DoctorService } from '../../../services/doctor.service';
import { Usuario } from '../../../models/usuario';
import { DetalleCitaComponent } from "./detalle-cita/detalle-cita.component";

@Component({
  selector: 'app-cita',
  imports: [CommonModule, DetalleCitaComponent],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css',
  providers: [CitaService, DoctorService]
})

export class CitaComponent {
  citavotada: boolean = false;
  isModalDetalleCitaActivo: boolean = false;
  isNotDoctor: boolean = false;
  usuario: Usuario;

  svg = {
    abrirModal: 'M9 5l7 7-7 7',
    hora: 'M11 8v5h5',
    usuario1: 'M11 7c0 1.66-1.34 3-3 3S5 8.66 5 7s1.34-3 3-3s3 1.34 3 3',
    usuario2: 'M16 8c0 4.42-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8M4 13.75C4.16 13.484 5.71 11 7.99 11c2.27 0 3.83 2.49 3.99 2.75A6.98 6.98 0 0 0 14.99 8c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 2.38 1.19 4.49 3.01 5.75',
    addReceta1: 'M7.007 12a.75.75 0 0 1 .75-.75h3.493V7.757a.75.75 0 0 1 1.5 0v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1-.75-.75',
    addReceta2: 'M7.317 3.769a42.5 42.5 0 0 1 9.366 0c1.827.204 3.302 1.643 3.516 3.48c.37 3.157.37 6.346 0 9.503c-.215 1.837-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.643-3.516-3.48a41 41 0 0 1 0-9.503c.214-1.837 1.69-3.276 3.516-3.48m9.2 1.49a41 41 0 0 0-9.034 0A2.486 2.486 0 0 0 5.29 7.424a39.4 39.4 0 0 0 0 9.154a2.486 2.486 0 0 0 2.193 2.164c2.977.332 6.057.332 9.034 0a2.486 2.486 0 0 0 2.192-2.164a39.4 39.4 0 0 0 0-9.154a2.486 2.486 0 0 0-2.192-2.163',
    voto: 'M7 10v12',
    votoTrue: 'M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z',
    votoFalse: 'M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z'

  }

  @Input() cita!: Cita;

  constructor(private router: Router, private citaService: CitaService, private doctorService: DoctorService) { 
    this.usuario = {} as Usuario;
  }

  get isCitasPage() {
    return this.router.url === '/misCitasUsuario';
  }

  ngOnInit() {
    console.log("comprobandoo")
    const usuarioGuardado = localStorage.getItem('usuario');
    console.log("constante susario", usuarioGuardado)
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
          console.log('Usuario cargado:', this.usuario);

      this.isNotDoctor = true;
    }else if (doctorGuardado) {
      this.isNotDoctor = false;
    }else {
      console.error('No hay usuario ni doctor logueado');
    }

  }

  getFirstLetterOfDay(date: string): string {
    const dayName = new Date(date).toLocaleDateString('es-ES', { weekday: 'long' });
    return dayName.charAt(0).toUpperCase();
  }

  cancelarCita(id: number) {
    this.citaService.cancelarCita(id).subscribe();
    window.location.reload();
  }

  voto(idDoctor: number, valoracion: boolean) {
    this.doctorService.votarDoctor(idDoctor, valoracion).subscribe(
      doctor => {
        this.citaService.marcarComoVotada(this.cita.id).subscribe(
          cita => {
            window.location.reload();
          }
        );

      }
    );
  }

  sumarMediaHora(fecha: string): Date {
    const fechaObjeto = new Date(fecha);
    const nuevaFecha = new Date(fechaObjeto);
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() + 30);
    return nuevaFecha;
  }

  abrirModal(cita: Cita) {
    this.cita = cita;  // Asigna la cita al componente antes de abrir el modal
    document.body.classList.add('overflow-hidden');
    this.isModalDetalleCitaActivo = true;  // Abre el modal
  }

  cerrarModal() {
    this.isModalDetalleCitaActivo = false;
    document.body.classList.remove('overflow-hidden');
  }

}