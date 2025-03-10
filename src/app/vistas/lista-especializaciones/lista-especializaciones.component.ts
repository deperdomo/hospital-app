import { Component, OnInit } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { InfoDoctorComponent } from "../../sections/doctores-recomendados/info-doctor/info-doctor.component";
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';
import { EspecialidadService } from '../../services/especialidad.service';
import { Especialidad } from '../../models/especialidad';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-doctores',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './lista-especializaciones.component.html',
  styleUrl: './lista-especializaciones.component.css',
  providers: [DoctorService, EspecialidadService]
})
export class ListaEspecializacionesComponent {
  especialidad: Especialidad[];
  doctor: Doctor[];
  doctoresFiltrados: Doctor[];
  mostrarEspecialidades: boolean = true;
  tituloEspecialidad: string = '';
  constructor(private especialidadService: EspecialidadService, private router: Router, private doctorService: DoctorService) {
    this.especialidad = [];
    this.doctor = [];
    this.doctoresFiltrados = [];

    //this.mostrarEspecialidades=Boolean;
  }
  ngOnInit() {
    this.especialidadService.getEspecialidades().subscribe(
      (especialidad: Especialidad[]) => {
        this.especialidad = especialidad;
      },
      (error) => {
        console.error('Error al obtener las especialidades', error);
      }

    )
    this.doctorService.getTodosDoctores().subscribe(
      (doctor: Doctor[]) => {
        this.doctor = doctor;
      },
      (error) => {
        console.error('Error al obtener los doctores', error);
      }
    )
  }
  redirigirPaginaPerfil() {
    // this.router.navigate(['/index']);
    if (!this.mostrarEspecialidades) {
      // Si está mostrando los doctores, vuelve a las especialidades
      this.volverAEspecialidades();
    } else {
      // Si está en especialidades, redirige a index
      this.router.navigate(['/index']);
    }
  }

  verDoctores(especialidadId: number) {
    const especialidadSeleccionada = this.especialidad.find(especialidad => especialidad.id === especialidadId);

    // Si la especialidad fue encontrada, convierte su nombre a plural
    if (especialidadSeleccionada) {
      this.tituloEspecialidad = this.getTituloEspecialidad(especialidadSeleccionada.nombre);
    }

    this.doctoresFiltrados = this.doctor.filter(
      (doctor) => doctor.especialidad.id === especialidadId
    );
    this.mostrarEspecialidades = false; // Oculta las especialidades y muestra los doctores
  }

  volverAEspecialidades() {
    this.mostrarEspecialidades = true; // Muestra las especialidades nuevamente
    this.doctoresFiltrados = []; // Limpia la lista de doctores
  }
  getTituloEspecialidad(especialidad: string): string {
    // Convertir a minúsculas para evitar errores por mayúsculas
    const especialidadLower = especialidad.toLowerCase();
    
    // Reglas específicas de pluralización
  
    // Si la especialidad termina en "ía" (y no es "ología"), se convierte en "as"
    if (especialidadLower.endsWith("ía") && !especialidadLower.endsWith("ología")) {
      return especialidad.replace("ía", "as"); // Pediatría → Pediatras, Psiquiatría → Psiquiatras
    }
  
    // Si la especialidad termina en "ología", se convierte en "ólogos"
    if (especialidadLower.endsWith("ología")) {
      return especialidad.replace("ología", "ólogos"); // Cardiología → Cardiólogos, Neurología → Neurólogos
    }
  
    // Excepción para "cirugía general"
    if (especialidadLower === "cirugía general") {
      return "Cirujanos Generales"; // Excepción manual
    }
  
    // Si la especialidad termina en "ista", simplemente le agregamos "s"
    if (especialidadLower.endsWith("ista")) {
      return especialidad + "s"; // Nutricionista → Nutricionistas
    }
  
    // Si termina en "n", "r" o "l", le agregamos "es" (como en Cirujano → Cirujanos)
    if (especialidadLower.endsWith("n") || especialidadLower.endsWith("r") || especialidadLower.endsWith("l")) {
      return especialidad + "es"; // Ej: Cirujano → Cirujanos, Doctor → Doctores, Especial → Especiales
    }
  
    // Caso general: simplemente agregar "s"
    return especialidad + "s";
  }
  


}
// especialidad: Especialidad;InfoDoctorComponent
// constructor(private especialidadService: EspecialidadService) {
//     this.especialidad = [];
//   }
//   ngOnInit() {
//     this.especialidadService.getEspecialidades().subscribe(
//       (especialidad: Especialidad[]) => {
//         this.especialidad = doctores;
//       },
//       error => {
//         console.error('Error al recuperar los todos los doctores', error);
//       });
//   }
