import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Doctor } from '../../../models/doctor';
import { DoctorService } from '../../../services/doctor.service';
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadService } from '../../../services/especialidad.service';
@Component({
  selector: 'app-new-doctor',
  imports: [CommonModule, FormsModule,HttpClientModule],
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
      nombre: 'Juan',
      username: 'juan1234',
      apellidos: 'Pérez',
      email: 'doctor@ejemplo.com',
      provincia: 'Madrid',
      localidad: 'Centro',
      direccion: 'Calle Falsa 123',
      fechaAlta: '2025-01-01',
      fotoPerfil: 'usu_anonimo.png',
      password: 'juan123',
      experiencia: 3,
      precioConsulta: 20,
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
    console.log('Doctor a crear', this.doctor);
    
    this.doctorService.altaDoctor(this.doctor).subscribe(
      (doctor: Doctor) => {
        this.doctor = doctor;
        console.log('Doctor creado correctamente', doctor);
        this.router.navigate(['/index']);
      },
      error => {
        this.errorMessage = error.error;
        console.error('Error al crear el doctor', error);
      }
    );
  }

  enviarEstado() {
    this.cambiarEstado.emit(false);
    document.body.classList.remove('overflow-hidden');
  }

}
