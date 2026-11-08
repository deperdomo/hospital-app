import { Component, Input } from '@angular/core';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita';
import { Doctor } from '../../../models/doctor';
import { DoctorService } from '../../../services/doctor.service';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { EstadoBadgeComponent } from '../../lista-citas/estado-badge/estado-badge.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-cita-historial',
  imports: [CommonModule, EstadoBadgeComponent],
  templateUrl: './cita-historial.component.html',
  styleUrl: './cita-historial.component.css',

})

export class CitaHistorialComponent {


  // @Input() doctor!: Doctor;
  @Input() cita!: Cita;
  @Input() usuarios!: boolean;
  //probadno alamcenar id
  private citaGuardada!: Cita; //cojo los valores

  get citaSeleccionada(): Cita {//alacena los valores de cita 
    return this.citaGuardada;
  }

  seleccionarCita(cita: Cita) {
    this.citaGuardada = cita; // Al hacer clic en una cita, se actualiza la seleccionada
  }
  // constructor(private citaService: CitaService,private doctorService:DoctorService){}

  //sumar media hora a la hora 
  sumarMediaHora(fecha: string): Date {
    const fechaObjeto = new Date(fecha);
    const nuevaFecha = new Date(fechaObjeto);
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() + 30);
    return nuevaFecha;
  }

}
