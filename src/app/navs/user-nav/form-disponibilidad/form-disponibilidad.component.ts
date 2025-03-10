import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Disponibilidad } from '../../../models/disponibilidad';
import { DisponibilidadService } from '../../../services/disponibilidad.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../../models/doctor';

@Component({
  selector: 'app-form-disponibilidad',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-disponibilidad.component.html',
  styleUrl: './form-disponibilidad.component.css',
  providers: [DisponibilidadService]
})
export class FormDisponibilidadComponent {
  disponibilidadAntigua: Disponibilidad;
  isDisponibilidadAntigua: boolean = false;

  @Output() cambiarEstadoFormDisponibilidad = new EventEmitter<boolean>();
  @Input() doctor!: Doctor;
  constructor(private disponibilidadService: DisponibilidadService) {
    this.disponibilidadAntigua = {} as Disponibilidad;
  }

  ngOnInit() {
    this.disponibilidadService.getDisponibilidadDoctor(this.doctor.id).subscribe(
      (disponibilidad) => {
        if (disponibilidad) {
          this.disponibilidadAntigua = disponibilidad;
          this.isDisponibilidadAntigua = true;
        }
      }
    )
  }

  enviarEstado() {
    this.cambiarEstadoFormDisponibilidad.emit(false);
  }

  onSubmit() {
    this.disponibilidadAntigua.doctor = this.doctor;
    if (this.isDisponibilidadAntigua) {
      this.disponibilidadService.modificarDisponibilidad(this.disponibilidadAntigua).subscribe(
        () => {
          this.enviarEstado();
        }
      )
    } else {
      console.log('Disponibilidad a crear', this.disponibilidadAntigua);
      this.disponibilidadService.altaDisponibilidad(this.disponibilidadAntigua).subscribe(
        () => {
          window.location.reload();
        }
      )
    }
  }

  validateMinutes(event: Event): void {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);
    
    if (minutes !== 0 && minutes !== 30) {
      input.setCustomValidity('Solo se permiten minutos en 00 o 30.');
    } else {
      input.setCustomValidity('');
    }

    input.reportValidity();
  }

}
