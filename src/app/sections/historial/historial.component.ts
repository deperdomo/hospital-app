import { Component, Input } from '@angular/core';
import { CitaHistorialComponent } from "./cita-historial/cita-historial.component";
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-historial',
  imports: [CitaHistorialComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  providers:[CitaService]
})
export class HistorialComponent {
  usuario: Usuario;
  //necesito cita
  citas:Cita[]=[];
  citasActuales: Cita[] = [];
  citasPasadas: Cita[] = [];
  citasProximas: Cita[] = [];
  @Input() cita!: Cita;
  //constantes de citas
//   citasActuales: Cita[] = [];
//  citasPendientes: Cita[] = [];
  constructor(private citaService:CitaService) {
      this.usuario = {} as Usuario;
     // this.cita={} as Cita;
    }
    ngOnInit() {
     console.log("esta en ngOninit")
     console.log("Comprobando",this.citas)
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        this.usuario = usuario;
        console.log("esto es pasado el if", this.usuario.id)
        console.log("COMPROBANDO",this.usuario)
        console.log("probando id", this.usuario.id)
        //this.obtenerCitaUsuario(this.usuario.id); 
        if (this.usuario.id !== undefined) {
         this.obtenerCitas(this.usuario.id);//paso id para saber que usuario es 
       } else {
         console.error("El ID del usuario es undefined.");
       }
      }
      
    }
    obtenerCitas(id: number) { // Función modificada
      const fechaActual = new Date().toISOString().split('T')[0]; // Obtenemos la fecha actual en formato "YYYY-MM-DD"

    // Llamamos al servicio para obtener todas las citas del usuario
    this.citaService.getCitasUsuario(id.toString()).subscribe({
      next: (citas) => {
        console.log("Citas obtenidas:", citas);

        // Clasificamos las citas en actuales, pasadas y próximas
        this.citasActuales = [];
        this.citasPasadas = [];
        this.citasProximas = [];

        citas.forEach(cita => {
          if (cita.fecha < fechaActual) {
            this.citasPasadas.push(cita); // Si la cita es pasada
          } else if (cita.fecha === fechaActual) {
            this.citasActuales.push(cita); // Si la cita es actual
          } else {
            this.citasProximas.push(cita); // Si la cita es próxima
          }
        });

        console.log("Citas Pasadas:", this.citasPasadas);
        console.log("Citas Actuales:", this.citasActuales);
        console.log("Citas Próximas:", this.citasProximas);
        if (this.citasActuales.length) {
          this.citaService.getCitasActuales(id.toString(), fechaActual).subscribe({
            next: (citasActuales) => {
              this.citasActuales = citasActuales;
              console.log("Citas actuales desde el backend:", citasActuales);
            },
            error: (error) => {
              console.error("Error al obtener citas actuales desde el backend:", error);
            }
          });
        }

        if (this.citasPasadas.length) {
          this.citaService.getCitasPasadas(id.toString(), fechaActual).subscribe({
            next: (citasPasadas) => {
              this.citasPasadas = citasPasadas;
              console.log("Citas pasadas desde el backend:", citasPasadas);
            },
            error: (error) => {
              console.error("Error al obtener citas pasadas desde el backend:", error);
            }
          });
        }

        if (this.citasProximas.length) {
          this.citaService.getCitasProximas(id.toString(), fechaActual).subscribe({
            next: (citasProximas) => {
              this.citasProximas = citasProximas;
              console.log("Citas próximas desde el backend:", citasProximas);
            },
            error: (error) => {
              console.error("Error al obtener citas próximas desde el backend:", error);
            }
          });
        }
      },
      error: (error) => {
        console.error("Error al obtener las citas del usuario:", error);
      }
    });
  }
   
 

 
   
}
