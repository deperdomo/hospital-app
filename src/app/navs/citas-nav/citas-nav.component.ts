import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-nav-citas',
  imports: [CommonModule],
  templateUrl: './citas-nav.component.html',
  styleUrl: './citas-nav.component.css'
})
export class NavCitasComponent {
  currentDate: Date = new Date();

  // getCurrentMonthYear(): string {
  //   const options: Intl.DateTimeFormatOptions = {
  //     month: 'long',
  //     year: 'numeric'
  //   };
  //   const formattedDate = this.currentDate.toLocaleString('es-ES', options);
  //   return this.capitalizeFirstLetter(formattedDate);
  // }
  // capitalizeFirstLetter(string: string): string {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }
  // nextMonth() {
  //   this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
  // }
  months: string[] = [];
  monthsList: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Obtener el mes y año actual
  getCurrentMonthYear(): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = this.currentDate.toLocaleString('es-ES', options);
    return this.capitalizeFirstLetter(formattedDate);
  }

  // Capitaliza la primera letra
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Obtén el próximo mes
  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
    this.updateMonthList();
  }

  // Cambia el mes seleccionado
  onMonthSelected(event: any) {
    const monthIndex = event.target.value;
    this.currentDate = new Date(this.currentDate.getFullYear(), monthIndex, 1);
    this.updateMonthList();
  }

  // Actualizar la lista de meses
  updateMonthList() {
    const currentMonthIndex = this.currentDate.getMonth();
    this.months = this.monthsList.slice(currentMonthIndex); // Obtén solo los meses siguientes
  }

  ngOnInit() {
    this.updateMonthList();
  }
}
