import { Component, Input } from '@angular/core';
import { CitaHistorialComponent } from "./cita-historial/cita-historial.component";
import { Cita } from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../models/doctor';
import { InformesConmponent } from "./cita-historial/informes/informes.component";
import { HttpClient } from '@angular/common/http';
import { partesFecha } from '../lista-citas/fecha-cita';

@Component({
  selector: 'app-historial',
  imports: [CitaHistorialComponent, CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  providers: [CitaService]
})
export class HistorialComponent {
  usuario: Usuario;
  doctor:Doctor;
  usuarios:boolean=false
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
    this.doctor = {} as Doctor;
  }
  ngOnInit() {

    const usuarioGuardado = localStorage.getItem('usuario');
    const doctorGuardado = localStorage.getItem('doctor');
    if (usuarioGuardado) {
      this.usuarios=true;
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;
      
      if (this.usuario.id !== undefined) {
        this.obtenerCitas(this.usuario.id);//paso id para saber que usuario es 
      } else {
      }
    }
    else if (doctorGuardado) {
      this.usuarios = false
      const doctor = JSON.parse(doctorGuardado);
      this.doctor = doctor;

      if (this.doctor.id !== undefined) {
        this.obtenerCitas(this.doctor.id);//paso id para saber que usuario es 
      } else {
      }
     }

  }
  /**
   * Una sola petición (citas del paciente o del doctor) y clasificación en el cliente:
   * antes de hoy → pasadas (más reciente primero), hoy → actuales, después → próximas por día.
   * Las fechas se comparan en UTC, como el resto de la app (se guardan sin zona horaria).
   */
  obtenerCitas(id: number) {
    const hoy = new Date().toISOString().slice(0, 10);
    const citas$ = this.usuarios
      ? this.citaService.getCitasUsuario(id.toString())
      : this.citaService.getCitasDoctor(id.toString());
    citas$.subscribe({
      next: (citas) => {
        this.citasPasadas = [];
        this.citasActuales = [];
        this.citasProximas = [];
        this.citasAgrupadas = {};
        for (const cita of [...citas].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())) {
          const dia = new Date(cita.fecha).toISOString().slice(0, 10);
          if (dia < hoy) {
            this.citasPasadas.unshift(cita);
          } else if (dia === hoy) {
            this.citasActuales.push(cita);
          } else {
            this.citasProximas.push(cita);
            (this.citasAgrupadas[dia] ??= []).push(cita);
          }
        }
      },
      error: (error) => console.error('Error al obtener las citas:', error),
    });
  }

  /** Encabezado de cada día de «Próximas»: "sábado, 7 de noviembre de 2026" (clave YYYY-MM-DD, en UTC como el resto). */
  fechaLarga(fecha: string): string {
    return partesFecha(fecha).larga;
  }

  // recibo el objeto  para luego buscar la fecha  en el return
  filtrarOrdenarCitasProximas(citasProximas: { [fecha: string]: Cita[] }): string[] {
    return Object.keys(citasProximas)
      .filter(fecha => new Date(fecha) > new Date()) // Filtrar solo las fechas futuras
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); // Ordenar ascendente
  }
  
}
