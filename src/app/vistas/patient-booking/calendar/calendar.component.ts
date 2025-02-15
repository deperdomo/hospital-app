import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Doctor } from '../../../models/doctor';
import { DisponibilidadService } from '../../../services/disponibilidad.service';
import { Disponibilidad } from '../../../models/disponibilidad';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  providers: [DisponibilidadService]
})
export class CalendarComponent {
  weekDays: string[] = ["L", "M", "M", "J", "V", "S", "D"];
  calendarDays: Date[] = [];
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  selectedTime: Date | null = null;
  timeSlots: Date[] = [];

  @Output() dateTimeSelected = new EventEmitter<Date>();

  @Input() doctor!: Doctor;
  disponibilidad: Disponibilidad;

  horaInicio: number = 0;
  minutosInicio: number = 0;
  horaFin: number = 0;
  minutosFin: number = 0;
  intervalo: number = 0;

  constructor(private dispoService: DisponibilidadService) {
    this.disponibilidad = {
      id: 1,
      horaInicio: '00:00:00',
      horaFin: '00:00:00',
      estado: 'activo',
      comentarios: 'N/A',
      doctor: {
        id: 1,
        nombre: 'Dr. Example',
        username: 'dexample',
        apellidos: 'Example Apellido',
        email: 'example@example.com',
        provincia: 'Madrid',
        localidad: 'Madrid',
        direccion: '123 Example St',
        fechaAlta: '2025-01-01',
        fotoPerfil: 'url_to_image',
        password: 'password123',
        experiencia: 10,
        precioConsulta: 100,
        especialidad: { id: 1, nombre: 'Cardiología' },
        sexo: 'M'
      }
    }
  }

  ngOnInit() {
    console.log('entrando al ngInit');
    console.log('Doctor:', this.doctor);

    if (this.doctor) {
      this.dispoService.getDisponibilidadDoctor(this.doctor.id).subscribe(
        (disponibilidad: Disponibilidad) => {
          this.disponibilidad = disponibilidad;
          this.obtenerHoraDeDisponibilidad(disponibilidad.horaInicio, disponibilidad.horaFin);
          console.log('Disponibilidad del doctor:', disponibilidad);

          // Generar días del calendario y franjas horarias después de obtener la disponibilidad
          this.generateCalendarDays();
          this.generateTimeSlots();
        },
        (error) => {
          console.error('Error al obtener la disponibilidad del doctor', error);
      });
    }
  }

  obtenerHoraDeDisponibilidad(horaInicio: string, horaFin: string) {
    this.horaInicio = parseInt(horaInicio.substring(0, 2));
    this.minutosInicio = parseInt(horaInicio.substring(3, 5));
    this.horaFin = parseInt(horaFin.substring(0, 2));
    this.minutosFin = parseInt(horaFin.substring(3, 5));

    let minutosFincalculo: number = this.minutosFin == 30 ? 30 : 0;
    let minutosIniciocalculo: number = this.minutosInicio == 30 ? 30 : 0;

    this.intervalo = ((this.horaFin * 60 + minutosFincalculo) - (this.horaInicio * 60 + minutosIniciocalculo)) / 60;
    console.log('Intervalo:', this.intervalo);

    console.log('Hora de inicio:', this.horaInicio, this.minutosInicio);
  }

  emitSelectedDateTime() {
    if (this.selectedDate && this.selectedTime) {
      const dateTime = this.getSelectedDateTime();
      this.dateTimeSelected.emit(dateTime);
    }
  }

  generateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    startingDay = startingDay === 0 ? 6 : startingDay - 1; // Ajuste para que la semana empiece en lunes

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
  }

  generateTimeSlots() {
    this.timeSlots = [];
    const baseDate = new Date();
    baseDate.setHours(this.horaInicio, this.minutosInicio, 0, 0);

    for (let i = 0; i < this.intervalo * 2 + 1; i++) {
      const time = new Date(baseDate);
      this.timeSlots.push(time);
      console.log('Franja horaria:', time);

      baseDate.setMinutes(baseDate.getMinutes() + 30);
    }
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
    this.generateCalendarDays();
  }

  selectDate(date: Date) {
    const day = date.getDay();
    if (date < new Date(new Date().setHours(0, 0, 0, 0)) || day === 0 || day === 6) return;
    this.selectedDate = date;
    this.emitSelectedDateTime();
  }

  selectTime(time: Date) {
    this.selectedTime = time;
    this.emitSelectedDateTime();
  }

  isCurrentDate(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  isSelectedDate(date: Date): boolean {
    return this.selectedDate?.getDate() === date.getDate() &&
           this.selectedDate?.getMonth() === date.getMonth() &&
           this.selectedDate?.getFullYear() === date.getFullYear();
  }

  isSelectedTime(time: Date): boolean {
    return this.selectedTime?.getHours() === time.getHours() &&
           this.selectedTime?.getMinutes() === time.getMinutes();
  }

  getSelectedDateTime(): Date {
    if (!this.selectedDate || !this.selectedTime) return new Date();
    const dateTime = new Date(this.selectedDate);
    dateTime.setHours(this.selectedTime.getHours());
    dateTime.setMinutes(this.selectedTime.getMinutes());
    return dateTime;
  }

  getSelectedDateTimeFormatted(): string {
    const dateTime = this.getSelectedDateTime();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return dateTime.toLocaleString('es-ES', options);
  }

  getSelectedDateFormatted(): string {
    if (!this.selectedDate) return '';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return this.selectedDate.toLocaleString('es-ES', options);
  }

  getSelectedWeekday(): string {
    if (!this.selectedDate) return '';
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return this.selectedDate.toLocaleString('es-ES', options);
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
}
