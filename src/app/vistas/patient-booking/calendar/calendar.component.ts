import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  weekDays: string[] = ["L", "M", "M", "J", "V", "S", "D"];
  calendarDays: Date[] = [];
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  selectedTime: Date | null = null;
  timeSlots: Date[] = [];

  @Output() dateTimeSelected = new EventEmitter<Date>();

  emitSelectedDateTime() {
    if (this.selectedDate && this.selectedTime) {
      const dateTime = this.getSelectedDateTime();
      this.dateTimeSelected.emit(dateTime);
    }
  }

  ngOnInit() {
    this.generateCalendarDays();
    this.generateTimeSlots();
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
    baseDate.setHours(10, 30, 0, 0);

    for (let i = 0; i < 13; i++) {
      const time = new Date(baseDate);
      this.timeSlots.push(time);
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
