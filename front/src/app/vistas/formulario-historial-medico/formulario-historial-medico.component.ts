import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { HistorialMedicoService } from '../../services/historialMedico';
import { HistorialMedico } from '../../models/historialMedico';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-formulario-historial-medico',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-historial-medico.component.html',
  styleUrl: './formulario-historial-medico.component.css',
  providers: [HistorialMedicoService, UsuarioService, CitaService, RecetaService]
})
export class FormularioHistorialMedicoComponent implements OnInit {
  usuario: Usuario;
  historialMedico: HistorialMedico;
  cita: Cita;
  recetaExistente: boolean = false;

  constructor(
    private historialMedicoService: HistorialMedicoService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private citaSerice: CitaService,
    private recetaService: RecetaService
  ) {
    this.usuario = {} as Usuario;
    this.cita = {} as Cita;
    this.historialMedico = {
      id: 0,
      tratamiento: '',
      fecha: '',
      diagnostico: '',
      usuario: {} as Usuario
    } as HistorialMedico;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idUsuario = params.get('id');
      const idCita = params.get('idCita');

      if (idUsuario && idCita) {
        this.citaSerice.getCita(idCita).subscribe(
          (cita: Cita) => {
            this.cita = cita;
            this.comprobacionRecetaExistente(this.cita.id);
          },
          (error) => {
            console.error("Error al obtener la cita:", error);
          }
        );
        this.usuarioService.buscarUsuario(idUsuario).subscribe(
          (usuario: Usuario) => {
            this.usuario = usuario;
          },
          (error) => {
            console.error("Error al buscar usuario:", error);
          }
        );
      } else {
      }
    });
  }

  crearHistorial(idUsuario: number, idCita: number) {
    if (idUsuario) {
      this.historialMedicoService.crearHistorialMedico(idUsuario.toString(), this.historialMedico).subscribe(
        (historial) => {
          if (this.usuario.id != null && historial && this.historialMedico.id != null) {
            this.redireccionAltaReceta(this.usuario.id, historial.id, idCita);
          }
        },
        (error) => {
          console.error("Error al crear historial:", error);
        }
      );
    }
  }

  redireccionAltaReceta(idUsuario: number, idHistorialMedico: number, idCita: number) {
    this.router.navigate(['/formularioReceta', idUsuario, idCita, idHistorialMedico]);
  }

  navigateToProfile() {
    this.router.navigate(['/indexDoctores']);
  }

  comprobacionRecetaExistente(idCita: number) {
  
    this.recetaService.obtenerCitaReceta(idCita.toString()).subscribe(
      (existeReceta: boolean) => { 
        this.recetaExistente = existeReceta; 
      },
      error => {
        console.error("Error al verificar receta:", error);
        this.recetaExistente = false; // si hay error no hay receta
      }
    );
  }
  
}