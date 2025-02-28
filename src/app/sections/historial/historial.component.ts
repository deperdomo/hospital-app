import { Component, Input } from '@angular/core';
import { CitaHistorialComponent } from "./cita-historial/cita-historial.component";
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  imports: [CitaHistorialComponent, CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  providers: [CitaService]
})
export class HistorialComponent {
  usuario: Usuario;
  //necesito cita
  citas: Cita[] = [];
  citasActuales: Cita[] = [];
  citasPasadas: Cita[] = [];
  citasProximas: Cita[] = [];
  //probando para fechas proximas 
  citasAgrupadas: { [fecha: string]: Cita[] } = {};//declarar un objeto vacio donde la fecha son la claves y las citas son valores asociados ala clave
  //recibo una fecha y devuelvo la cita
  
  @Input() cita!: Cita;
  
  constructor(private citaService: CitaService) {
    this.usuario = {} as Usuario;
    
  }
  ngOnInit() {
    console.log("esta en ngOninit")
    console.log("Comprobando", this.citas)
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
      console.log("esto es pasado el if", this.usuario.id)
      console.log("COMPROBANDO", this.usuario)
      console.log("probando id", this.usuario.id)
      
      if (this.usuario.id !== undefined) {
        this.obtenerCitas(this.usuario.id);//paso id para saber que usuario es 
      } else {
        console.error("El ID del usuario es undefined.");
      }
    }

  }
  obtenerCitas(id: number) { // Función modificada
    //transforma en cadena de texto y la T es separador de fecha y hora 
    // Obtenemos la fecha actual en formato "YYYY-MM-DD"
    const fechaActual = new Date().toISOString().split('T')[0];
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    //const dia = new Date().toISOString().split('T')[0];
    //console.log("Dia de hoy nuevo console log", dia)
    console.log("comprobacion de fecha de hoy", fechaActual)
    const optenerCitasAyer = ayer.toISOString().split('T')[0];
    console.log("comprobacion de fecha actual", fechaActual);
   
    // Llamamos al servicio para obtener todas las citas del usuario
    this.citaService.getCitasUsuario(id.toString()).subscribe({
      next: (citas) => {

        console.log("Citas obtenidas:", citas);
      
        // Clasificamos las citas en actuales, pasadas y próximas
        this.citasActuales = [];
        this.citasPasadas = [];
        this.citasProximas = [];

        citas.forEach(cita => {
          console.log(citas);

          const fechaCita = new Date(cita.fecha).toISOString().split('T')[0];
          console.log("COMPROBACION DE DE FECHA CITA Y DE FECHA ACTUAL")
          console.log("fecha actual", fechaActual);
          console.log("comprovar fecha de ayer ", optenerCitasAyer)
          console.log("comprobacion de fechaCita", fechaCita)
          console.log("antes del if de compracion de fechas ", this.citasActuales)
          console.log(cita.fecha)
          if (fechaCita === optenerCitasAyer) {

            this.citasPasadas.push(cita); // Si la cita es pasada

          } else if (fechaCita === fechaActual) {
            console.log("AQUIII")
            console.log("fecha de la cita", cita.fecha);
            console.log("fecha actual", fechaActual)
            console.log("Comparacion ===", fechaCita === fechaActual)

            this.citasActuales.push(cita); // Si la cita es actual
            console.log("Comprobando for Each de citas")
          } else {

            
            if (fechaCita > fechaActual) {
              if (!this.citasAgrupadas[fechaCita]) {
                this.citasAgrupadas[fechaCita] = [];
              }
              this.citasAgrupadas[fechaCita].push(cita);
            }
          }
        });
        
        console.log("Citas Pasadas DESPUES DE COMPARACION DE FECHA:", this.citasPasadas);
        console.log("Citas Actuales Despues de la comprobacion de fechas :", this.citasActuales);
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
          console.log("Mirando una cosa", this.citasPasadas)
          //cambiado aqui
          console.log("ANTES DEL SERVICIO PARA PASADAS")
          this.citaService.getCitasPasadas(id.toString(), optenerCitasAyer).subscribe({
            next: (citasPasadas) => {
              this.citasPasadas = citasPasadas;

              console.log("Citas pasadas desde el backend DESPUES DEL SERVICE:", citasPasadas);

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
  // recibo el objeto  para luego buscar la fecha  en el return
  filtrarOrdenarCitasProximas(citasProximas: { [fecha: string]: Cita[] }): string[] {
    return Object.keys(citasProximas)
      .filter(fecha => new Date(fecha) > new Date()) // Filtrar solo las fechas futuras
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); // Ordenar ascendente
  }
  
}
