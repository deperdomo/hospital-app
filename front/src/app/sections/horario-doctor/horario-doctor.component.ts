import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { format, isToday as isDateToday, isSaturday, isSunday, isSameMonth } from "date-fns";
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import { CitaService } from "../../services/cita.service";
import { Usuario } from "../../models/usuario";
import { Doctor } from "../../models/doctor";
import { Cita } from "../../models/cita";
import { DialogDirective } from "../../shared/dialog.directive";
import { EstadoBadgeComponent } from "../lista-citas/estado-badge/estado-badge.component";
import { sumarMediaHora } from "../lista-citas/fecha-cita";

registerLocaleData(localeEs);

@Component({
  selector: 'app-horario-doctor',
  standalone: true,
  imports: [CommonModule, DialogDirective, EstadoBadgeComponent],
  templateUrl: './horario-doctor.component.html',
  styleUrl: './horario-doctor.component.css',
  providers: [CitaService]
})
export class HorarioDoctorComponent implements OnInit {
  currentDate: Date = new Date();
  calendarDays: Date[] = [];
  /** Días laborables del mes visible que tienen citas (vista de móvil). */
  diasConCitas: Date[] = [];
  weekDays: string[] = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  selectedAppointment: boolean = false;

  @Input() citas: Cita[] = [];
  usuario: Usuario;
  doctor: Doctor;
  cita: Cita;

  /** Citas agrupadas por día ("yyyy-MM-dd" en UTC, como se guardan) y ordenadas por hora. */
  private citasPorDia = new Map<string, Cita[]>();

  constructor(private citaService: CitaService) {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
    this.cita = {} as Cita;
  }

  ngOnInit() {
    const doctoroGuardado = localStorage.getItem('doctor');

    if (doctoroGuardado) {
      this.doctor = JSON.parse(doctoroGuardado);
    }

    this.cargarCitas();
    this.generateCalendarDays();
  }

  cargarCitas() {
    this.citaService.getCitasDoctor(String(this.doctor.id)).subscribe(
      (citas: Cita[]) => {
        this.citas = citas;
        this.agruparCitas();
      }
    );
  }

  private agruparCitas() {
    this.citasPorDia.clear();
    const ordenadas = [...this.citas].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    for (const cita of ordenadas) {
      const clave = new Date(cita.fecha).toISOString().slice(0, 10);
      const lista = this.citasPorDia.get(clave);
      if (lista) {
        lista.push(cita);
      } else {
        this.citasPorDia.set(clave, [cita]);
      }
    }
    this.calcularDiasConCitas();
  }

  private calcularDiasConCitas() {
    this.diasConCitas = this.calendarDays.filter(day =>
      this.isCurrentMonth(day) && !this.isWeekend(day) && this.getAppointmentsForDay(day).length > 0);
  }

  generateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    startingDay = startingDay === 0 ? 6 : startingDay - 1;

    this.calendarDays = [];

    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1);
      this.calendarDays.push(prevDate);
    }

    for (let i = 1; i <= totalDays; i++) {
      this.calendarDays.push(new Date(year, month, i));
    }

    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDays.push(new Date(year, month + 1, i));
    }

    this.calcularDiasConCitas();
  }

  getCurrentMonthYear(): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = this.currentDate.toLocaleString('es-ES', options);
    return this.capitalizeFirstLetter(formattedDate);
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  isWeekend(date: Date): boolean {
    return isSaturday(date) || isSunday(date);
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
    this.generateCalendarDays();
  }

  irAHoy() {
    this.currentDate = new Date();
    this.generateCalendarDays();
  }

  isToday(date: Date): boolean {
    return isDateToday(date);
  }

  getAppointmentsForDay(date: Date): Cita[] {
    return this.citasPorDia.get(format(date, "yyyy-MM-dd")) ?? [];
  }

  /** Clases completas (sin concatenar) para que Tailwind no las purgue. */
  claseDia(day: Date): string {
    if (this.isToday(day)) {
      return 'bg-brand-50 border-brand-500';
    }
    if (this.isWeekend(day) || !this.isCurrentMonth(day)) {
      return 'bg-surface-muted border-line-subtle';
    }
    return 'bg-white border-line';
  }

  claseChip(estado: string): string {
    switch (estado) {
      case 'terminada': return 'chip-terminada';
      case 'cancelada': return 'chip-cancelada';
      default: return 'chip-pendiente';
    }
  }

  showAppointmentDetails(cita: Cita) {
    document.body.classList.add('overflow-hidden');
    this.selectedAppointment = true;
    return this.cita = cita;
  }

  closeAppointmentDetails() {
    this.selectedAppointment = false;
    document.body.classList.remove('overflow-hidden');
  }

  isCurrentMonth(date: Date): boolean {
    return isSameMonth(date, this.currentDate);
  }

  sumarMediaHora(fecha: string): Date {
    return sumarMediaHora(fecha);
  }

  calcularEdad(fechaNacimiento: string): number {
    const añoNacimiento = parseInt(fechaNacimiento.substring(0, 4));

    if (isNaN(añoNacimiento)) {
      return 0;
    }

    const añoActual = new Date().getFullYear();
    return añoActual - añoNacimiento;
  }
}
