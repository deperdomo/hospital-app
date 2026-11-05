import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { DialogDirective } from '../../../shared/dialog.directive';

interface SeccionAyuda {
  id: string;
  title: string;
  /** Trazo de un icono outline de 24 px. */
  icono: string;
  texto: string;
  puntos?: string[];
}

const ICONOS = {
  calendario: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
  documento: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  lupa: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  ubicacion: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
  reloj: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  campana: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
};

@Component({
  selector: 'app-ayuda',
  imports: [CommonModule, DialogDirective],
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent {
  isOpen: boolean = false;
  @Output() cambiarEstado = new EventEmitter<boolean>();
  enviarEstado() {
    this.isOpen = false;
    document.body.classList.remove('overflow-hidden');
    this.cambiarEstado.emit(this.isOpen);
  }

  /** Los doctores ven la ayuda de su panel; los pacientes, la de siempre. */
  private readonly esDoctor = !localStorage.getItem('usuario') && !!localStorage.getItem('doctor');

  sections: SeccionAyuda[] = this.esDoctor ? [
    { id: 'agenda', title: 'Agenda de hoy', icono: ICONOS.reloj,
      texto: 'En el inicio ves las citas de hoy ordenadas por hora, con el paciente, el motivo y el estado. Desde cada cita puedes ver el detalle y, cuando la consulta ha terminado, añadir la receta.' },
    { id: 'horario', title: 'Horario', icono: ICONOS.calendario,
      texto: 'El horario muestra tu mes completo. Pulsa una cita para ver los datos del paciente, usa las flechas para cambiar de mes y «Hoy» para volver al mes actual.' },
    { id: 'citas', title: 'Citas y recetas', icono: ICONOS.documento,
      texto: 'En Citas tienes las próximas, las pasadas y las canceladas. En las consultas terminadas puedes consultar la receta que registraste.' },
    { id: 'notificaciones', title: 'Notificaciones', icono: ICONOS.campana,
      texto: 'La campana te avisa cuando un paciente reserva una cita contigo. Al abrir el panel, las notificaciones se marcan como leídas.' },
  ] : [
    { id: 'citas', title: 'Gestión de citas', icono: ICONOS.calendario,
      texto: 'Programa, modifica o cancela citas médicas con doctores disponibles. Visualiza tu calendario de citas pendientes y recibe recordatorios automáticos.' },
    { id: 'historial', title: 'Historial médico', icono: ICONOS.documento,
      texto: 'Accede a tu historial médico completo con diagnósticos, tratamientos y resultados de exámenes. Descarga informes en PDF con un solo clic.' },
    { id: 'doctores', title: 'Buscador de doctores', icono: ICONOS.lupa,
      texto: 'Filtra doctores por:',
      puntos: ['Nombre completo o especialidad', 'Ubicación del consultorio', 'Disponibilidad horaria', 'Seguros médicos aceptados', 'Calificación y reseñas'] },
    { id: 'cercanos', title: 'Doctores cercanos', icono: ICONOS.ubicacion,
      texto: 'Encuentra doctores cerca de tu ubicación usando geolocalización. Visualiza distancias, tiempos de llegada y opciones de transporte.' },
  ];
  activeSection: string | null = null;

  toggleSection(section: string): void {
    this.activeSection = this.activeSection === section ? null : section;
  }

}
