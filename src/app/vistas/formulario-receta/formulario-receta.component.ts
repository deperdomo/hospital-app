import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Receta } from '../../models/receta';
import { Cita } from '../../models/cita';
import { HistorialMedico } from '../../models/historialMedico';
import { HistorialMedicoService } from '../../services/historialMedico';
import { UsuarioService } from '../../services/usuario.service';
import { CitaService } from '../../services/cita.service';
import { RecetaService } from '../../services/receta.service';


@Component({
  selector: 'app-formulario-receta',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './formulario-receta.component.html',
  styleUrl: './formulario-receta.component.css',
  providers: [HistorialMedicoService, UsuarioService, CitaService, RecetaService]
})
export class FormularioRecetaComponent {
  usuario: Usuario;
  historialMedico: HistorialMedico;
  cita: Cita;
  receta: Receta;
  constructor(private route: ActivatedRoute, private historialMedicoService: HistorialMedicoService, private usuarioService: UsuarioService, private recetaService: RecetaService, private citaService: CitaService) {
    this.usuario = {} as Usuario;
    this.historialMedico = {} as HistorialMedico;
    this.cita = {} as Cita;
    this.receta = {
      id: 0,
      nombre_medicamento: '',
      dosis: '',
      frecuencia: '',
      fechaInicio: '',
      fechaFin: '',
      instrucciones: '',
      usuario: {} as Usuario,
      historialMedico: {} as HistorialMedico,
      cita: {} as Cita
    } as Receta;
  }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const idUsuario = params.get('idUsuario');
      const idCita = params.get('idCita');
      const idHistorialMedico = params.get('idHistorialMedico');

      if (idUsuario && idCita && idHistorialMedico) {
        this.historialMedicoService.getHistorialMedicoId(idHistorialMedico).subscribe(
          (historialMedico: HistorialMedico) => {
            this.historialMedico = historialMedico;

            this.citaService.getCita(idCita).subscribe(
              (cita: Cita) => {
                this.cita = cita;

                this.usuarioService.buscarUsuario(idUsuario).subscribe(
                  (usuario: Usuario) => {
                    this.usuario = usuario;

                    // Asignar los valores completos a receta
                    this.receta.usuario = this.usuario;
                    this.receta.historialMedico = this.historialMedico;
                    this.receta.cita = this.cita;

                    console.log('Receta inicializada:', this.receta);
                  },
                  error => console.error('Error obteniendo usuario:', error)
                );
              },
              error => console.error('Error obteniendo cita:', error)
            );
          },
          error => console.error('Error obteniendo historial médico:', error)
        );
      } else {
        console.error('Faltan parámetros en la ruta.');
      }
    });
  }

  altaReceta(idUsuario: number, idHistorialMedico: number, idCita: number) {
    // Validar que receta esté completa
    if (!this.receta || !this.receta.usuario || !this.receta.historialMedico || !this.receta.cita) {
      console.error('El objeto receta no está completo:', this.receta);
      return;
    }

    console.log('Receta enviada al servicio:', this.receta);

    this.recetaService.altaReceta(
      idUsuario.toString(),
      idCita.toString(),
      idHistorialMedico.toString(),
      this.receta
    ).subscribe(
      (receta: Receta) => {
        console.log('Respuesta del backend:', receta);
      },
      error => {
        console.error('Error al enviar receta:', error);
      }
    );
  }

}

