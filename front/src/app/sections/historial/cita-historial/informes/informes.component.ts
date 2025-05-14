import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RecetaService } from '../../../../services/receta.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../../../models/usuario';
import { Doctor } from '../../../../models/doctor';
import { Cita } from '../../../../models/cita';
import { Receta } from '../../../../models/receta';
import { CitaService } from '../../../../services/cita.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-informes',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
  providers: [RecetaService, CitaService]
})
export class InformesConmponent implements OnInit {
  usuario: Usuario;
  doctor: Doctor;
  recetas: Receta[] = [];
   cita!: Cita;  // Cita que llega del componente padre

  usuarios: boolean = false;

  // Constructor para los servicios                                                           //coje los valores de la url
  constructor(private recetaService: RecetaService, private citaService: CitaService,private route: ActivatedRoute,private router: Router) {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
    this.cita = {} as Cita;
  }

  ngOnInit() {
    console.log("COMPROBANDO SI ESTA LLEGADO A /INFORMES")
    //route para la url dinamica
    //paramMap = para coger los datos de la url
    this.route.paramMap.subscribe(params => {
      const idCita = params.get('id'); // Captura el id de la URL
      if (idCita) {
        this.obtenerCita(idCita);
      } else {
        console.log("No se encontró un ID en la URL.");
      }
    });
    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');

    // Verificar si existe usuario o doctor en localStorage
    if (usuarioGuardado) {
      this.usuarios = true;
      this.usuario = JSON.parse(usuarioGuardado);
    } else if (doctorGuardado) {
      this.usuarios = false;
      this.doctor = JSON.parse(doctorGuardado);
      console.log('Doctor encontrado', this.doctor);
    }
    console.log("llamando al metodo", this.cita)
    
    this.citaService.getCita(this.cita.id.toString()).subscribe({
      next: (cita) => {
        this.cita = cita;
        this.getRecetas(this.cita);
      },
      error: (error) => {
        console.log('Error al obtener la cita:', error);
        // Muestra un mensaje de error al usuario
      },
    });
    }
    obtenerCita(idCita: string) {
      this.citaService.getCita(idCita).subscribe({
        next: (cita) => {
          this.cita = cita;
          this.getRecetas(this.cita);
        },
        error: (error) => {
          console.error('Error al obtener la cita:', error);
        },
      });
    }
  // Método para obtener las recetas asociadas a la cita
  getRecetas(cita: Cita) {
    console.log("COMPROBANDO SI ESTA LLEGADO A /INFORMES")
    if (this.usuarios && this.usuario?.id) {
      console.log('Obteniendo recetas para el usuario:', this.usuario.id);
      // Si el usuario está presente y tiene un id, obtenemos las recetas
      this.recetaService.getRecetaCita(this.usuario.id.toString(), cita.id.toString()).subscribe({
        next: (recetas) => {
          this.recetas = recetas;  // Asignar las recetas obtenidas
        },
        error: (error) => {
          console.error('Error al obtener recetas del usuario:', error);
        }
      });
    } else if (!this.usuarios && this.doctor?.id) {
      console.log('Obteniendo recetas para el doctor:', this.doctor.id);
      // Si el doctor está presente y tiene un id, obtenemos las recetas
      this.recetaService.getRecetaCita(this.doctor.id.toString(), cita.id.toString()).subscribe({
        next: (recetas) => {
          this.recetas = recetas;  // Asignar las recetas obtenidas
        },
        error: (error) => {
          console.error('Error al obtener recetas del doctor:', error);
        }
      });
    } else {
      console.error('No se encontró ni un usuario ni un doctor para obtener recetas.');
    }
  }
  navigateToProfile() {
    this.router.navigate(['/perfilHistorial']);
  }
}
