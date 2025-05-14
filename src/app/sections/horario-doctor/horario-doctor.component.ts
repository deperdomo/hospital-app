import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { format, isToday as isDateToday, isSaturday, isSunday, isSameMonth } from "date-fns";
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import { CitaService } from "../../services/cita.service";
import { Usuario } from "../../models/usuario";
import { Doctor } from "../../models/doctor";
import { Cita } from "../../models/cita";

registerLocaleData(localeEs);

@Component({
  selector: 'app-horario-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario-doctor.component.html',
  styleUrl: './horario-doctor.component.css',
  providers: [CitaService]
})
export class HorarioDoctorComponent implements OnInit {
  currentDate: Date = new Date();
  calendarDays: Date[] = [];
  weeks: Date[][] = [];
  weekDays: string[] = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  selectedAppointment: boolean = false;

  @Input() citas: Cita[] = [];
  usuario: Usuario;
  doctor: Doctor;
  cita: Cita;

  constructor(private citaService: CitaService) {
    this.usuario = {} as Usuario;
    this.doctor = {} as Doctor;
    this.cita = {} as Cita;
  }

  ngOnInit() {
    const doctoroGuardado = localStorage.getItem('doctor');
    console.log(doctoroGuardado);

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
        console.log(this.citas);
      }
    );
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

    this.generateWeeks(); // nuevo
  }

  generateWeeks() {
    this.weeks = [];
    for (let i = 0; i < this.calendarDays.length; i += 7) {
      const week = this.calendarDays.slice(i, i + 7);
      this.weeks.push(week);
    }
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

  isToday(date: Date): boolean {
    return isDateToday(date);
  }

  getAppointmentsForDay(date: Date): Cita[] {
    return this.citas.filter((cita) =>
      format(cita.fecha, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
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
    const fechaObjeto = new Date(fecha);
    const nuevaFecha = new Date(fechaObjeto);
    nuevaFecha.setMinutes(nuevaFecha.getMinutes() + 30);
    return nuevaFecha;
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
