import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CitaService } from '../../services/cita.service';
import { MesesService } from '../../services/meses.service';



@Component({
  selector: 'app-nav-citas',
  imports: [CommonModule],
  templateUrl: './citas-nav.component.html',
  styleUrl: './citas-nav.component.css',
  providers: [CitaService, MesesService]
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

  constructor(private mesesService: MesesService) {
    this.generateNextSixMonths();
  }

  generateNextSixMonths() {
    this.months = this.mesesService.getNextSixMonths();
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

}
