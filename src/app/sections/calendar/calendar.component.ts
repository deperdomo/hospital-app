import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  calendarDays: Date[] = [];
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  selectedTime: Date | null = null;
  timeSlots: Date[] = [];

  ngOnInit() {
    this.generateCalendarDays();
    this.generateTimeSlots();
  }

  generateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

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
    baseDate.setHours(10, 0, 0, 0);

    for (let i = 0; i < 14; i++) {
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
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) return;
    this.selectedDate = date;
  }

  selectTime(time: Date) {
    this.selectedTime = time;
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

}
