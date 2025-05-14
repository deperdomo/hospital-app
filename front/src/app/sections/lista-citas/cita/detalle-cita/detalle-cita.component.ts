import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../../services/cita.service';
import { Usuario } from '../../../../models/usuario';
import { Cita } from '../../../../models/cita';
import { Doctor } from '../../../../models/doctor';

@Component({
  selector: 'app-detalle-cita',
  imports: [CommonModule],
  templateUrl: './detalle-cita.component.html',
  styleUrl: './detalle-cita.component.css',
  providers: [CitaService]
})
export class DetalleCitaComponent {
  mostrarModal: boolean = true;
  isUsuario: boolean = false;
  usuario: Usuario;
  doctor: Doctor;
  @Input() cita!: Cita;

  @Output() modalCerrado = new EventEmitter<boolean>();

  constructor(private citaService: CitaService) {
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
      this.doctor = JSON.parse(doctorGuardado);
      this.isUsuario = false;
    }

  }

  cerrarModal() {
    this.mostrarModal = false;
    document.body.classList.remove('overflow-hidden');
    this.modalCerrado.emit(this.mostrarModal);
  }

  sumarMediaHora(fecha: string): Date {
    const fechaObjeto = new Date(fecha);
    const nuevaFecha = new Date(fechaObjeto);
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() + 30);
    return nuevaFecha;
  }

  calcularEdad(fechaNacimiento: string): number {
    const añoNacimiento = parseInt(fechaNacimiento.substring(0, 4));

    if (isNaN(añoNacimiento)) {
      return 0;
    }

    const añoActual = new Date().getFullYear();
    return añoActual - añoNacimiento;
  }
}
