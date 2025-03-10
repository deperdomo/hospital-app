import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CitaService } from '../../services/cita.service';



@Component({
  selector: 'app-nav-citas',
  imports: [CommonModule],
  templateUrl: './citas-nav.component.html',
  styleUrl: './citas-nav.component.css',
  providers: [CitaService]
})
export class NavCitasComponent {
  currentDate: Date = new Date();
  selectedButton: string = 'proxima';

  months: { monthName: string, monthNumber: number }[] = [];
  selectedMonth: number = this.currentDate.getMonth();

  @Output() citasProximas = new EventEmitter<void>();
  @Output() citasCanceladas = new EventEmitter<void>();
  @Output() citasPasadas = new EventEmitter<void>();

  @Output() monthSelected = new EventEmitter<number>();

  constructor() {
    this.generateMonths();
  }

  generateMonths() {
    const monthList = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    this.months = [];
    const currentMonth = this.currentDate.getMonth();
    console.log('Mes actual:', currentMonth); 
    
    // Genera los próximos 6 meses (a partir del mes actual)
    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth + i) % 12; // Para que vuelva a empezar desde Enero (0)
      this.months.push({
        monthName: monthList[monthIndex], // Nombre del mes
        monthNumber: monthIndex // Número del mes (0 - 11)
      });
    }
  
    console.log('Meses generados:', this.months); // Para verificar que estamos generando correctamente los meses
  }
  
  

  onSelectButton(buttonType: string) {
    this.selectedButton = buttonType;
  }

  listaCitasProximas() {
    this.citasProximas.emit();
  }
  listaCitasPasadas() {
    this.citasPasadas.emit();
  }
  listaCitasCanceladas() {
    this.citasCanceladas.emit();
  }

  onMonthSelected(event: any) {
    this.selectedMonth = parseInt(event.target.value, 10);
    this.monthSelected.emit(this.selectedMonth);  // Emitimos el mes seleccionado
    console.log("Mes seleccionado:", this.selectedMonth);
  }

  getCurrentMonthYear(): string {
    const date = new Date();
    const month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
    return `${month}/${year}`;
  }


  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
