import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Doctor } from '../../../models/doctor';
import { DoctorService } from '../../../services/doctor.service';
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadService } from '../../../services/especialidad.service';
import { DialogDirective } from '../../../shared/dialog.directive';
@Component({
  selector: 'app-new-doctor',
  imports: [CommonModule, FormsModule, DialogDirective],
  templateUrl: './new-doctor.component.html',
  styleUrl: './new-doctor.component.css',
  providers: [DoctorService, EspecialidadService]
})
export class NewDoctorComponent {
  doctor: Doctor;
  especialidad: Especialidad;
  especialidades: Especialidad[];
  errorMessage: string = '';

  @Output() cambiarEstado = new EventEmitter<boolean>();

  constructor(private doctorService: DoctorService, private espacialidadService: EspecialidadService, private router: Router) {
    this.especialidades = [];
    this.especialidad = {
      id: 0,
      nombre: 'Traumatología',
    };
    this.doctor = {
      id: 0,
      nombre: '',
      username: '',
      apellidos: '',
      email: '',
      provincia: '',
      localidad: '',
      direccion: '',
      fechaAlta: new Date().toISOString().slice(0, 10),
      fotoPerfil: 'usu_anonimo.png',
      password: '',
      experiencia: null as unknown as number,
      precioConsulta: null as unknown as number,
      especialidad: this.especialidad, 
      sexo: 'masculino',
      votos: 0,
    };
    
  }

  ngOnInit() {
    this.espacialidadService.getEspecialidades().subscribe(
      (especialidades: Especialidad[]) => {
        this.especialidades = especialidades;
      },
      error => {
        console.error('Error al cargar las especialidades', error);
      }
    );
  }

  onSubmit() {
    
    this.doctorService.altaDoctor(this.doctor).subscribe(
      (doctor: Doctor) => {
        this.enviarEstado();
      },
      error => {
        this.errorMessage = error.error;
        console.error('Error al crear el doctor', error);
      }
    );
  }

  enviarEstado() {
    this.cambiarEstado.emit(false);
  }

}
