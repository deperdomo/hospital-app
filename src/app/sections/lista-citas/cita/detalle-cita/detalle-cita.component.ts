import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../../services/cita.service';
import { Usuario } from '../../../../models/usuario';
import { Cita } from '../../../../models/cita';

@Component({
  selector: 'app-detalle-cita',
  imports: [CommonModule],
  templateUrl: './detalle-cita.component.html',
  styleUrl: './detalle-cita.component.css',
  providers: [CitaService]
})
export class DetalleCitaComponent {
  mostrarModal: boolean = true;
  usuario: Usuario;
  @Input() cita!: Cita;

  @Output() modalCerrado = new EventEmitter<boolean>();

  constructor(private citaService: CitaService) {
    this.usuario = {} as Usuario;
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
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
}
